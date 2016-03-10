var points = document.getElementsByClassName('point');

var degree = 0;

var revealPoint = function(points) {
  for (var i = 0; i < points.length; i++) {
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
  }
};


function rotateImage(logoImage, deg) {
  logoImage.style.transform = "rotate("+deg+"deg)";
  logoImage.style.msTransform = "rotate("+deg+"deg)";
  logoImage.style.WebkitTransform = "rotate("+deg+"deg)";
}

revealPoint(points);

window.setInterval(function(){
  var logoImage = document.getElementById('logo-image');
  rotateImage(logoImage, degree);
  degree++;
  if (degree === 360) {
    degree = 1;
  }
}, 33);