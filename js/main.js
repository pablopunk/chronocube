
function init() {
  initInput();
  initData();
  initSettings();
  initScramble();
}

if (typeof(require) == "function") {
	window.$ = window.jQuery = require('./js/jquery.js') // This line is for a working ELectron app with jQuery )
}