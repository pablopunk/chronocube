
// Modified version of http://www.proglogic.com/code/javascript/time/chronometer.php

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var msec = 0
var sec = 0
var min = 0

function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	msec = diff.getMilliseconds()
	sec = diff.getSeconds()
	min = diff.getMinutes()
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	if (min > 0) MainLayout.updateChronoTime(min+":"+sec)	// more than 1 minute (m:ss)
	else MainLayout.updateChronoTime(sec)									// less than 1 minute (  ss)
	if (state == chronoState.INSPECTION && sec > 14) clearTimeout(timerID) // stop
	else timerID = setTimeout("chrono()", 10) // continue
}
function chronoStart(){
	start = new Date()
	chrono()
}
function chronoContinue(){
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("timer").innerHTML = "00:00.00"
	start = new Date()
}
function chronoStopReset(){
	document.getElementById("timer").innerHTML = "00:00.00"
}
function chronoStop(){
	MainLayout.setChronoTime(min,sec,msec.toString().substring(0,2))
	clearTimeout(timerID)
}
