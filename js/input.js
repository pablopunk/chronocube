

$(function(){ // this will be called when the DOM is ready

  // Prevent SPACE from scrolling down the browser window
  document.documentElement.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
    }
  }, false);

  var isRunning = "no"
  var spacePressed = "no"

  function start() {
    chronoReset(); chronoStart(); isRunning = "yes";
  }

  function stop() {
    chronoStop(); isRunning = "no"; saveTime(); updateTimes();
  }

  $('body').keyup(function() { // Starting at SPACE released
    if (event.which == 32) {
      if (isRunning == "no" && spacePressed == "no") {
        start();
      }
      spacePressed="no"
    }
  });

  $('body').keydown(function() { // Stoping at SPACE pressed
    if (event.which == 32) {
      if (isRunning == "yes") {
        spacePressed = "yes"
        stop();
      }
    }
  });
});
