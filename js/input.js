

$(function(){ // this will be called when the DOM is ready

  var isRunning = "no"
  var enterPressed = "no"

  function start() {
    chronoReset(); chronoStart(); isRunning = "yes";
  }

  function stop() {
    chronoStop(); isRunning = "no"; saveTime(); updateTimes();
  }

  $('body').keyup(function() { // Starting at ENTER released
    if (event.which == 32) {
      if (isRunning == "no" && enterPressed == "no") {
        start();
      }
      enterPressed="no"
    }
  });

  $('body').keydown(function() { // Stoping at ENTER pressed
    if (event.which == 32) {
      if (isRunning == "yes") {
        enterPressed = "yes"
        stop();
      }
    }
  });
});
