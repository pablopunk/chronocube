
var MainLayout
var Data
var Error
var Scramble

function init() {
	Data = new DataManager();
	MainLayout = new Layout();
	Error = new ErrorHandle();
  	Input();
  	initScramble();
}

if (typeof(require) == "function") {
	window.$ = window.jQuery = require('./js/jquery.js') // This line is for a working ELectron app with jQuery )
}