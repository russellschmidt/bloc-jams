/* album.js */

// pull in song content
var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
    + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
  
  var $row = $(template);
  
  var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number'));
    
    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if (currentlyPlayingSongNumber !== songNumber) {
      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
      
      var $volumeFill = $('.volume .fill');
      var $volumeThumb = $('.volume .thumb');
      var currentPercentVolume = currentVolume + '%';
      $volumeFill.width(currentPercentVolume);
      $volumeThumb.css({
        left: currentPercentVolume
      });
      
    } else if (currentlyPlayingSongNumber === songNumber) {
      //$(this).html(playButtonTemplate);
      //$('.main-controls .play-pause').html(playerBarPlayButton);
      if (currentSoundFile.isPaused()){
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        $('.main-controls .play-pause').html(playerBarPauseButton);
        //getSongNumberCell(songNumber).html(pauseButtonTemplate);
        $(this).html(pauseButtonTemplate);
      } else {
        currentSoundFile.pause();
        $('.main-controls .play-pause').html(playerBarPlayButton);
        //getSongNumberCell(songNumber).html(playButtonTemplate);
        $(this).html(playButtonTemplate);
      }
    } 
  };
  
  var onHover = function(event) {
    /* jQuery */
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
    
    //console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber is " + typeof currentlyPlayingSongNumber);
  };
  
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row
  
}; 

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  
  $albumSongList.empty();
  
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};


var updateSeekBarWhileSongPlays = function() {
  if (currentSoundFile) {
    // timeupdate is a Buzz event that fires off all the time with time elapsed on song
    currentSoundFile.bind('timeupdate', function(event) {
      // getTime is a Buzz method that gives current time of the song (in s)
      // getDuration is a Buzz method that gives duration of the song (in s)
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100; //get a percentage by x 100
  // set upper and lower bounds of 0, 100
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);
  
  // convert number to string
  var percentageString = offsetXPercent + '%';
  
  // pass percentage into element and adjust CSS dynamically
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({
    left: percentageString
  });
};

var setupSeekBars = function() {
  // this function is to come up with the seekBarFillRatio
  var $seekBars = $('.player-bar .seek-bar');
  
  // whatever seekbar is clicked/tapped can use this function
  $seekBars.click(function(event) {
    // pageX holds the x-coordinate at which the event occurred (jQuery event value)
    // $(this).offset().left is x-distance of left start of the bar object from left side
    // event.pageX is the distance (x-coord) of the thing clicked to the left side 
    // so event.pageX - $(this).offset().left is the distance from clicked thing to 0 on bar
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();
    // we need a percentage so we divide offsetX by barWidth
    var seekBarFillRatio = offsetX / barWidth;
    
    if ($(this).parent().attr('class') == 'seek-control'){
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    } else {
      setVolume(seekBarFillRatio * 100);
    }
    
    updateSeekPercentage($(this), seekBarFillRatio);
  });
  
  // mouse events
  $seekBars.find('.thumb').mousedown(function(event){
    var $seekBar = $(this).parent();
    // while the button is down we also bind the action to any mouse movement
    $(document).bind('mousemove.thumb', function(event){
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;
      
      if ($(this).parent().attr('class') == 'seek-control'){
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      } else {
        setVolume(seekBarFillRatio * 100);
      }
      
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
    // unbind the action when the mouse button is released
    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
      
    });
  });  
};


var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var nextSong = function() {
  
  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  }
  
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
  // increment. if its the last song, wrap.
  currentSongIndex++;
  if (currentSongIndex > currentAlbum.songs.length - 1) {
    currentSongIndex = 0;
  }
  
  // Setting the new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  //Update the player bar
  updateSeekBarWhileSongPlays();
  updatePlayerBarSong();
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
  var getLastSongNumber = function(index) {
    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2 ;
  }
  
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
  // decrement. if its the 1st song, wrap to last
  currentSongIndex--;
  if (currentSongIndex < 0 ) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }
  
  // Setting the new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  //Update the player bar
  updateSeekBarWhileSongPlays();
  updatePlayerBarSong();
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  
  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop()
  };
  
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];  
  
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3'],
    preload: true
  });
  
  setVolume(currentVolume);
};

var seek = function(time) {
  if (currentSoundFile) {
    // setTime is a Buzz method
    currentSoundFile.setTime(time);
  }
}; 

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

var getSongNumberCell = function (number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var togglePlayFromPlayerBar = function() {
  if (currentSoundFile.isPaused()) {
    getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
    $mainPlayPauseButton.html(playerBarPauseButton);
    currentSoundFile.play();
  } else if (currentSoundFile) {
    getSongNumberCell(currentlyPlayingSongNumber).html(playButtonTemplate);
    $mainPlayPauseButton.html(playerBarPlayButton);
    currentSoundFile.pause();
  }
};

// Album button templates & variables
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;  // stores the current album information
var currentlyPlayingSongNumber = null;  // stores the number of the currently playing song
var currentSongFromAlbum = null;  // holds the currently playing song object from songs array
var currentSoundFile = null;
var currentVolume = 80;
var $mainPlayPauseButton = $('.main-controls .play-pause');

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $mainPlayPauseButton.click(togglePlayFromPlayerBar);
  updateSeekBarWhileSongPlays();
});
