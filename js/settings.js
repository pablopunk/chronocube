
var scrollbar;
var overflowValue;
var hiddenScrollBars = "yes"

function initSettings() {
	scrollbar = document.getElementById("scroll-child")
	overflowValue = "3em"
}

function toggleScrollBars() {
	if (hiddenScrollBars==="yes") {
		showScrollBars()
	} else {
		hideScrollBars()
	}
	scrollUp(); scrollDown(); // forces the scroll bar to disappear/appear
}

function hideScrollBars() {
	scrollbar.style.paddingRight = overflowValue
	hiddenScrollBars = "yes"
}

function showScrollBars() {
	scrollbar.style.paddingRight = "0em"
	hiddenScrollBars = "no"
}
