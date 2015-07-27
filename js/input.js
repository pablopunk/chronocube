

window.onload = function() {
  // Prevent SPACE from scrolling down the browser window
  document.documentElement.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
    }
  }, false);

  var isRunning = "no"
  var spacePressed = "no"

  document.body.addEventListener("keyup", spaceUp);
  document.body.addEventListener("keydown", spaceDown);

  function start() {
    chronoReset(); chronoStart(); isRunning = "yes";
  }

  function stop() {
    chronoStop(); isRunning = "no"; saveTime(); updateTimes();
  }

  function spaceUp() { // Starting at SPACE released
    if (event.which == 32) {
      if (isRunning == "no" && spacePressed == "no") {
        start();
      }
      spacePressed="no"
    }
  }

  function spaceDown() { // Stoping at SPACE pressed
    if (event.which == 32) {
      if (isRunning == "yes") {
        spacePressed = "yes"
        stop();
      }
    }
  }

}
