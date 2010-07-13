/*********************
 * 
 *  Initialization
 *
 */

var numSlides;
var slideMargin = 100;
var slideWidth = screen.width + slideMargin;
var slideHeight = screen.height;
var secondsPerSlide = 10;

$(function() {
  numSlides = $('section').size();
  initializeSlideshowStyles();
  $('#play').click(function(event) {
    startAutoplay();
  });
});

function initializeSlideshowStyles() {
  $('#slideshow').width(numSlides * slideWidth);
  $('#slideshow').height(slideHeight);
  $('section').width(slideWidth - slideMargin - slideMargin - slideMargin - 30);
  $('section').css('margin-right', slideMargin + 30);
  $('section').css('margin-left', slideMargin);
  $('section').height(slideHeight);
}

/*********************
 * 
 *  Key Events
 *
 */

$(document).keydown(function(event) {
  // right arrow or space
  if ((event.which == 39) || (event.which == 32)) {
    goToSlide(currentSlideNumber() + 1);
    return false;
  }
  // left arrow
  else if (event.which == 37) {
    goToSlide(currentSlideNumber() - 1);
    return false;
  }
  // esc
  else if (event.which == 27) {
    stopAutoplay();
    return false;
  }
});

/*********************
 * 
 *  Slide Navigation
 *
 */

function goToSlide(slideNumber) {
  if (slideNumber < 1) {
    slideNumber = 1;
  }
  if (slideNumber > numSlides) {
    slideNumber = numSlides;
  }
  var targetScrollPosition = (slideNumber-1) * (slideWidth - 100);
  $(window).scrollLeft(targetScrollPosition);
}

function currentSlideNumber() {
  // we add a pixel to avoid a type of fencepost problem
  var currentHorizontalScrollPosition = $(window).scrollLeft() + 1;
  return Math.ceil(currentHorizontalScrollPosition / (slideWidth - 100));
}

/*********************
 * 
 *  Automatic Slide Advancement
 *
 */

function startAutoplay() {
  $('#play').hide();
  $('#timer').show();; 
  autoAdvanceSlide();
  automaticSlides = setInterval('autoAdvanceSlide()', 1000 * secondsPerSlide);
}

function autoAdvanceSlide() {
  goToSlide(currentSlideNumber() + 1);
  $('#timer').html(10); 
  if (currentSlideNumber() == numSlides) {
    stopAutoplay();
  } else {
    myCounter.start();
  }
}

function stopAutoplay() {
  clearInterval(automaticSlides);
  $('#play').show();
  $('#timer').hide();
}

/** Counter
 */
function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}


var myCounter = new Countdown({  
    seconds: 9,  // number of seconds to count down
    onUpdateStatus: function(sec){ $('#timer').html(sec);}, // callback for each second
    onCounterEnd: function(){ $('#timer').html(10); } // final action
});


