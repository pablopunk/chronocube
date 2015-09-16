var isRunning = "no"
var spacePressed = "no"

function Input() {
  // Prevent SPACE from scrolling down the browser window
  document.documentElement.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
    }
  }, false);

  document.body.addEventListener("keyup", spaceUp);
  document.body.addEventListener("keydown", spaceDown);

  function start() {
    chronoReset();
    chronoStart();
    isRunning = "yes";
    MainLayout.hideAll()
  }

  function stop() {
    chronoStop();
    isRunning = "no";
    Data.saveTime();
    Data.updateTimes();
    MainLayout.scrollDown();
    Scramble.displayScramble();
    MainLayout.showAll()
  }

  function spaceUp() { // Starting at SPACE released
    if (event.which == 32) {
      if (isRunning == "no" && spacePressed == "no") {
        document.getElementById('chronotime').style.color = "white"
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
      } else {
        document.getElementById('chronotime').style.color = "#92FE9D"
      }
    }
  }
}