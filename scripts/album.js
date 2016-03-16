// Example album 1
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: '4:26'},
    { title: 'Green', duration: '3:14'},
    { title: 'Red', duration: '5:01'},
    { title: 'Pink', duration: '3:21'},
    { title: 'Magenta', duration: '2:15'}
  ]
};

// Example album 2
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01'},
    { title: 'Ring, ring, ring', duration: '5:01'},
    { title: 'Fits in your pocket', duration: '3:21'},
    { title: 'Can you hear me now?', duration: '3:14'},
    { title: 'Wrong phone number', duration: '2:15'}
  ]
};

// Example album 3
var albumXmas = {
  title: 'The Most Wonderful Time of the Year',
  artist: 'Scott Weiland',
  label: 'Sonyversal Brothers',
  year: '2005',
  albumArtUrl: 'assets/images/album_covers/22.png',
  songs: [
    { title: 'Black Tar Holiday', duration: '2:02'},
    { title: 'Runny Nosed Reindeer', duration: '3:31'},
    { title: 'Blacked Out on Christmas Eve', duration: '2:11'},
    { title: 'Honey I Sold All The Presents (Again)', duration: '6:54'},
    { title: 'Where the Dog Smells', duration: '4:04'},
    { title: 'Rocks in my Stocking', duration: '1:59'},
    { title: 'Myrrh', duration: '1:59'},
    { title: 'What day is it? (Christmas Morning)', duration: '12:33'}
  ]
};


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
    var songNumber = $(this).attr('data-song-number');
    
    if (currentlyPlayingSong !== null) {
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }
    if (currentlyPlayingSong !== songNumber) {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
    } else if (currentlyPlayingSong === songNumber) {
      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
    } 
  };
  
  var onHover = function(event) {
    /* jQuery */
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');
    
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');
    
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };
  
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row
  
}; 

var setCurrentAlbum = function(album) {
  
  /* jQuery */
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  
  /* jQuery version */
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

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});



// Using Recursion to solve ------------------------------------
/*
var findParentByClassName = function(currentElement, className) {
  var parentElement = currentElement.parentElement;
  if (parentElement.getAttribute("class") === className) {
    return parentElement;
  } else if (parentElement === null) {
    alert("no parent found");
    break;
  } else {
    findParentByClassName(parentElement, className);
  }
};
*/

/*
var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  }
}

/* 
This function takes an element, and based on class name returns element with .song-item-number class
*/
/*
var getSongItem = function(currentElement) {
  switch (currentElement.className) {
    case "song-item-number":
      return currentElement;
    case "song-item-title":
    case "song-item-duration":
      return findParentByClassName(currentElement, "album-view-song-item").querySelector('.song-item-number');
    case "album-view-song-item":
      return currentElement.querySelector('.song-item-number');
    case "ion-play":
    case "ion-pause":
    case "album-song-button":
      return findParentByClassName(currentElement, 'song-item-number');
    default:
      return;
  }
};
*/
/*
var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  // if no song is playing, make this song play and change play icon to pause icon
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
    
  // if the current song is already playing, pause the song
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
    
  // if the clicked song is not the active song, set content of new song to pause button
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};
*/

  /*
  clickHandler()
  
    var songItem = getSongItem(targetElement);
  // if no song is playing, make this song play and change play icon to pause icon
    if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');

    // if the current song is already playing, pause the song
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;

    // if the clicked song is not the active song, set content of new song to pause button
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
  */
    
  /* my bad attempt 
    var $songItem = $(this).find('.song-item-number');
    var $songNumber = $songItem.attr('data-song-number');
    
    if (currentlyPlayingSong === null) {
      $songItem.html(playButtonTemplate);
      currentlyPlayingSong = $songNumber;
    } else if (currentlyPlayingSong === $songNumber) {
      $songItem.html(pauseButtonTemplate);
    } else if (currentlyPlayingSong !== $songNumber) {
      var $currentlyPlayingSongElement = $(document).find('[data-song-number="' + currentlyPlayingSong + '"]');
      $currentlyPlayingSongElement.html($(currentlyPlayingSongElement.attr('data-song-number')));
      $songItem.html('pauseButtonTemplate'); 
      currentlyPlayingSong = $songNumber;
    }
    */
