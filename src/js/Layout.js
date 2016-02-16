function Layout() {
	this.scrollbar = document.getElementById("scroll-child");
	this.overflowValue = "32pt";
	this.hiddenScrollBars = "yes";

	this.backgrounds = [
	  "url('img/background.jpg') no-repeat center center fixed",
	  "-webkit-linear-gradient(90deg, #f857a6 10%, #ff5858 90%)",
	  "-webkit-linear-gradient(90deg, #00d2ff 10%, #3a7bd5 90%)",
	  "-webkit-linear-gradient(90deg, #673AB7 10%, #512DA8 90%)",
	  "-webkit-linear-gradient(90deg, #fc00ff 10%, #00dbde 90%)",
	  "-webkit-linear-gradient(90deg, #dc2430 10%, #7b4397 90%)"
	];

	this.init = function() {
		$('#solveNames').select2();
		$('#solveNames').select2({
  			minimumResultsForSearch: Infinity,
				theme: "classic"
		});
		this.backgroundSelected = Data.restoreBackground();
    if (this.backgroundSelected == null || isNaN(this.backgroundSelected)) this.backgroundSelected = 0;
		this.changeBackground(this.backgrounds[this.backgroundSelected])
	}

  this.nextBackground = function() {
	  var newbg = this.backgrounds[ this.backgroundSelected >= this.backgrounds.length-1 ? this.backgroundSelected=0 : ++(this.backgroundSelected) ]
	  this.changeBackground(newbg)
	  Data.saveBackground();
	}

	this.changeBackground = function(bg) {
	  $('body').css({
	    "background": bg,
	    "background-size": "cover"
	  });
	}

	this.updateChronoTime = function(sec) {
		document.getElementById("chronotime").innerHTML = sec
	}

	this.setChronoTime = function(min,sec,msec) {
		document.getElementById("chronotime").innerHTML = min + ":" + sec + "." + msec
	}

	this.changeChronoColor = function(state) {
		if (state == chronoState.INSPECTION) {
			document.getElementById('chronotime').style.color = "#f1c40f"
		} else if (state == chronoState.HOLDING_INSPECTION) {
			document.getElementById('chronotime').style.color = "#f39c12"
		} else if (state == chronoState.HOLDING_SOLVE) {
			document.getElementById('chronotime').style.color = "#92FE9D"
		} else {
			document.getElementById('chronotime').style.color = "white"
		}
	}

	this.toggleScrollBars = function() {
		if (this.hiddenScrollBars==="yes") {
			this.showScrollBars()
		} else {
			this.hideScrollBars()
		}
		this.scrollUp(); this.scrollDown(); // forces the scroll bar to disappear/appear
	}

	this.toggleInspection = function() {
		inspection = !inspection
	}

	this.scrollUp = function() {
	  var scroll = document.getElementById('scroll-child')
	  scroll.scrollTop = 0;
	}

	this.scrollDown = function() {
	  var scroll = document.getElementById('scroll-child')
	  scroll.scrollTop = scroll.scrollHeight;
	}

	this.hideScrollBars = function() {
		this.scrollbar.style.paddingRight = this.overflowValue
		this.hiddenScrollBars = "yes"
	}

	this.showScrollBars = function() {
		this.scrollbar.style.paddingRight = "0"
		this.hiddenScrollBars = "no"
	}

	this.hideAll = function() {
		var divs = document.getElementsByClassName('hideall')
		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 0
		}
		$('#chronotime').css('font-size','160pt')
	}

	this.showAll = function() {
		var divs = document.getElementsByClassName('hideall')
		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 1
		}
		$('#chronotime').css('font-size','90pt')
	}

	this.showSettings = function() {
		this.hideDownloadOptions()
		document.getElementById('settings').style.transition = "opacity 0.3s";
		document.getElementById('settings').style.opacity = 0.9
	}
	this.hideSettings = function() {
		document.getElementById('settings').style.transition = "opacity 0.3s";
		document.getElementById('settings').style.opacity = 0
	}

	this.hideDownloadOptions = function() {
		document.getElementById('downloadtxt').style.position = 'absolute'
		document.getElementById('downloadcsv').style.position = 'absolute'
		document.getElementById('downloadtxt').style.opacity = 0
		document.getElementById('downloadcsv').style.opacity = 0
	}

	this.showDownloadOptions = function() {
		document.getElementById('downloadtxt').style.position = 'relative'
		document.getElementById('downloadcsv').style.position = 'relative'
		document.getElementById('downloadtxt').style.opacity = 1
		document.getElementById('downloadcsv').style.opacity = 1
	}

	this.toggleSettings = function() {
		if (document.getElementById('settings').style.opacity != 0) {
			this.hideSettings();
		} else {
			this.showSettings();
		}
	}

	this.displayNewSolveText = function() {
		$('#add-button').fadeOut(50)
		$('#newSolveText').fadeIn()
		$('#newSolveText').focus()
		$('#pressEnterToSaveSolveClass').fadeIn()
	}

	this.hideNewSolveText = function() {
		$('#newSolveText').fadeOut(50);
		$('#newSolveText').val('')
		$('#pressEnterToSaveSolveClass').fadeOut(50);
		$('#add-button').fadeIn();
	}

	this.newSolveClass = function(event, name) {
		if (event.keyCode == 13) {// enter key
			this.hideNewSolveText()
			Data.newSolve(name)
		}
	}
}
