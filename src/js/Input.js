
var inspection = false
var state = 0
var chronoState = {
  STOPPED: 0,
  HOLDING_INSPECTION: 1,
  INSPECTION: 2,
  HOLDING_SOLVE: 3,
  SOLVING: 4,
  SOLVED: 5
};

function Input() {

  document.body.addEventListener("keyup", spaceUp);
  document.body.addEventListener("keydown", spaceDown);

  function startSolve() {
    chronoReset();
    if (state == chronoState.HOLDING_INSPECTION) {
      chronoStart();
      state = chronoState.INSPECTION
    } else if (state == chronoState.HOLDING_SOLVE) {
      chronoStop();
      chronoStart();
      state = chronoState.SOLVING
    }
    MainLayout.changeChronoColor(state)
    MainLayout.hideAll()
  }

  function stop() {
    chronoStop();
    state = chronoState.SOLVED
    Data.add();
    Data.refresh();
    MainLayout.scrollDown();
    Scramble.displayScramble();
    MainLayout.showAll()
  }

  function spaceUp(event) { // Starting at SPACE released

    if ($('#newSolveText').is(":visible")) { // entering new solve
      if (event.keyCode == 27) MainLayout.hideNewSolveText(); // close on ESC
      return
    }
    if (event.which == 32) { // SPACE
      if (state == chronoState.SOLVED) state = chronoState.STOPPED;
      else startSolve()
    }
  }

  function spaceDown(event) { // Stoping at SPACE pressed
    if (state == 1 || state == 3 || state == 5) return; // don't repeat when holding down
    if ($('#newSolveText').is(":visible")) return; // entering new solve
    if (event.which == 32) {
      if (state == chronoState.STOPPED) {
        state = inspection ? chronoState.HOLDING_INSPECTION : chronoState.HOLDING_SOLVE
        MainLayout.changeChronoColor(state)
      } else if (state == chronoState.INSPECTION) {
        state = chronoState.HOLDING_SOLVE
        MainLayout.changeChronoColor(state)
      } else {
        stop()
      }
    }
  }
}
