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
  
  return template;
};

var setCurrentAlbum = function(album) {
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  
  albumSongList.innerHTML = '';
  
  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);  
  }
};

// Container for table of songs
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


window.onload = function() {
  setCurrentAlbum(albumPicasso);
  
  songListContainer.addEventListener('mouseover', function(event) {
    // restrict targeting to a single row and not each element in the row
    if (event.target.parentElement.className === 'album-view-song-item') {
      // change the track number into a play button
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });
  
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event){
      // we are waiting for the mouse to leave that song row and selecting the song number
      // we then set the song number back to a number from the play button
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    })
  }
};