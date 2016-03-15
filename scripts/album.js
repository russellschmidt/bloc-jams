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
  
  return $(template);
};

var setCurrentAlbum = function(album) {
  /* plain JavaScript
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  */
  
  /* jQuery */
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  
  /* plain JavaScript 
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
    
  albumSongList.innerHTML = '';
  
  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);  
  }
  */
  
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

// Using Recursion to solve
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


// Container for table of songs
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  
  songListContainer.addEventListener('mouseover', function(event) {
    // restrict targeting to a single row and not each element in the row
    if (event.target.parentElement.className === 'album-view-song-item') {
      // change the track number into a play button
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      
      if (songItemNumber !== currentlyPlayingSong) {
        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      }
    }
  });
  
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event){
      // we are waiting for the mouse to leave that song row and selecting the song number
      // we then set the song number back to a number from the play button
      // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
      
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      
      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }
    });
    
    songRows[i].addEventListener('click', function(event) {
      // event handler for the click that plays or pauses a song
      clickHandler(event.target);
    });
  }
};