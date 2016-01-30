var isRunning = "no"
var spacePressed = "no"

function Input() {

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
    Data.add();
    Data.refresh();
    MainLayout.scrollDown();
    Scramble.displayScramble();
    MainLayout.showAll()
  }

  function spaceUp(event) { // Starting at SPACE released
    if ($('#newSolveText').is(":visible")) {
      if (event.keyCode == 27) MainLayout.hideNewSolveText();
      return
    }
    if ($('#newSolveText').is(":visible")) return;
    if (event.which == 32) {
      if (isRunning == "no" && spacePressed == "no") {
        document.getElementById('chronotime').style.color = "white"
        start();
      }
      spacePressed="no"
    }
  }

  function spaceDown(event) { // Stoping at SPACE pressed
    if ($('#newSolveText').is(":visible")) return;
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
