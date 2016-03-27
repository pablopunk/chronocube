function Layout() {
	this.bigChrono = "210pt";
	this.smallChrono = "130pt";
	this.currentScrambleForHoverTime = "";
	this.historyDiv = document.getElementById('history')
	this.theme = 'bright'

	this.init = function() {
		// initial config
		this.displayScramble()
	}
	
	this.toggleSettings = function() {
    if ( $('div.settings').css('visibility') == 'hidden' ) {
      $('div.settings').css('visibility', 'visible')
    } else {
      $('div.settings').css('visibility', 'hidden')
    }
  }
  
  this.toggleHistory = function() {
    if ( $('div#history').css('visibility') == 'hidden' ) {
      $('div#history').css('visibility', 'visible')
    } else {
      $('div#history').css('visibility', 'hidden')
    }
  }
	
	this.scrollHistoryDown = function() {
		this.historyDiv.scrollTop = this.historyDiv.scrollHeight;
	}

	this.updateChronoTime = function(sec) {
		document.getElementById("timer").innerHTML = sec
	}

	this.setChronoTime = function(min,sec,msec) {
		document.getElementById("timer").innerHTML = min + ":" + sec + "." + msec
	}

	this.changeChronoColor = function(state) {
		if (state == chronoState.INSPECTION) {
			document.getElementById('timer').style.color = "#f1c40f"
		} else if (state == chronoState.HOLDING_INSPECTION) {
			document.getElementById('timer').style.color = "#f39c12"
		} else if (state == chronoState.HOLDING_SOLVE) {
			document.getElementById('timer').style.color = "#92FE9D"
		} else {
			color = "#2a82bb"
			if (this.theme == 'dark') color = "#1abc9c"
			document.getElementById('timer').style.color = color
		}
	}

	this.updateScramble = function() {
		Data.lastScramble = document.getElementById('scramble').innerHTML
		this.displayScramble();
	}
	
	this.displayScramble = function() {
		document.getElementById('scramble').innerHTML = scramblers["333"].getRandomScramble().scramble_string
	}

	this.showScrambleForTime = function(i) {
		var color = "#f1c40f" // orange
		this.currentScrambleForHoverTime = ""+document.getElementById('scramble').innerText
		document.getElementById('scramble').innerHTML = Data.getCurrentSession().times[i].scramble
		document.getElementById('time'+i).style.color = color
		document.getElementById('scramble').style.color = color
	}

	this.hideScrambleForTime = function(i) {
		document.getElementById('scramble').innerHTML = this.currentScrambleForHoverTime
		Data.refresh()
		document.getElementById('scramble').style.color = "#7f8c8d"
	}
	
	this.toggleInspection = function(elem) {
		if (inspection) { // deactivate
			$(elem).css('background-color', 'white');
			$(elem).css('color', '#1abc9c');
		} else { // activate
			$(elem).css('background-color', '#1abc9c');
			$(elem).css('color', 'white');
		}
		inspection = !inspection // toggle
	}

	this.hideAll = function() {
		var divs = document.getElementsByClassName('hideall')
		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 0
		}
		$('#timer').css('font-size', this.bigChrono)
	}

	this.showAll = function() {
		var divs = document.getElementsByClassName('hideall')
		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 1
		}
		$('#timer').css('font-size', this.smallChrono)
	}

	this.displayNewSessionText = function() {
		$('#add-button').fadeOut(50)
		$('#newSessionText').fadeIn()
		$('#newSessionText').focus()
		$('#pressEnterToSaveSession').fadeIn()
	}

	this.hideNewSessionText = function() {
		$('#newSessionText').fadeOut(50);
		$('#newSessionText').val('')
		$('#pressEnterToSaveSession').fadeOut(50);
		$('#add-button').fadeIn();
	}

	this.newSession = function(event, name) {
		if (event.keyCode == 13) {// enter key
			this.hideNewSessionText()
			Data.newSession(name)
		}
	}
	
	this.changeTheme = function() {
	 var oldlink = document.getElementsByTagName("link").item(1);
	 if (this.theme == 'bright') {
		 oldlink.href = 'css/dark.css';
		 this.theme = 'dark'
	 } else {
		 oldlink.href = 'css/bright.css';
  	 this.theme = 'bright' 
	 }
	 this.changeChronoColor(-1)
	}
}
