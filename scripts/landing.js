var pointsArray = document.getElementsByClassName('point');
var logoImage = document.getElementById('logo-image');
var degree = 0;

/* vanilla 
var animatePoints = function(points) {
  
  forEach(points, function(point){
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  });
};
*/

var animatePoints = function() {
  var revealPoint = function() {
    $(this).css({
      opacity: 1,
      transform: 'ScaleX(1) translateY(0)'
    });
  };
  $.each($('.point'), revealPoint);
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

/* *** Vanilla ***
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
*/

/* jQ */
$(window).load(function(){
  if ($(window).height() > 950) {
    animatePoints();
  }
  
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
  
  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
      animatePoints();
    }
  });
});