var pointsArray = document.getElementsByClassName('point');
var logoImage = document.getElementById('logo-image');
var degree = 0;

var animatePoints = function(points) {
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

window.setInterval(function(){
  rotateImage(logoImage, degree);
  degree++;
  if (degree === 360) {
    degree = 1;
  }
}, 33);

window.onload = function() {
  // start animation if the user has a tall browser window
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }
  
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  
  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  });
}