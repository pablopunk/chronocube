
var MainLayout
var Data
var Error
var Scramble

function init() {
	MainLayout = new Layout();
	Data = new DataManager();
	Data.init();
	MainLayout.init();
	Error = new ErrorHandle();
  	Scramble = new ScrambleObject();
  	Input();
}

if (typeof(require) == "function") {
	window.$ = window.jQuery = require('./js/jquery.js') // This line is for a working ELectron app with jQuery )
}
