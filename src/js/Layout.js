function Layout() {
	this.bigChrono = "210pt";
	this.smallChrono = "130pt";
	this.currentScrambleForHoverTime = "";
	this.historyDiv = document.getElementById('history')
	this.theme = 'bright'
	this.newTimeButtonHTML = '<tr onclick="MainLayout.displayNewTimeText()"><td colspan="3" style="cursor:pointer" ><i id="add-button" class="icon ion-ios-plus-outline"></i> New solve</td></tr>'
	this.newTimeTextHTML = '<tr><td colspan="3"><input type="text" id="newTimeText" onkeyup="MainLayout.newTime(event, this.value)"> <i id="del-button" class="icon ion-ios-close-outline minus" onclick="MainLayout.hideNewTimeText()"></i></td></tr>'
	this.hideTimerWhileSolving=0
	this.isAllHidden=false
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
		if (state==chronoState.SOLVING && this.hideTimerWhileSolving) {
			document.getElementById("timer").innerHTML = '<i class="icon ion-ios-stopwatch-outline"></i>'
		}
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
			$(elem).removeAttr('style');
		} else { // activate
			$(elem).css('background-color', '#1abc9c');
			$(elem).css('color', 'white');
		}
		inspection = !inspection // toggle
	}

	this.toggleHideTimer = function(elem) {
		if (this.hideTimerWhileSolving) { // deactivate
			$(elem).removeAttr('style');
		} else {
			$(elem).css('background-color', '#1abc9c');
			$(elem).css('color', 'white');
		}
		this.hideTimerWhileSolving = !this.hideTimerWhileSolving; // toggle
	}

	this.getTimerInBigAndCentered = function() {
		$('#timer').css('font-size', this.bigChrono)						// increase timer size
		$('#timer').animate({ "margin-top": "-=15%"}, 300, "easeOutCirc")	// center on the screen
	}

	this.getTimerBackToNormal = function() {
		$('#timer').animate({ "margin-top": "+=15%"}, 300, "easeOutCirc")	// go back to normal
		$('#timer').css('font-size', this.smallChrono)						// go back to normal
	}

	this.hideAll = function() {
		if (this.isAllHidden) return; // exit if it's already hidden

		this.isAllHidden = true;

		var divs = document.getElementsByClassName('hideall')
		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 0
		}

		this.getTimerInBigAndCentered();
	}

	this.showAll = function() {
		var divs = document.getElementsByClassName('hideall')

		this.getTimerBackToNormal();

		for (var d=0; d<divs.length; d++) {
			divs[d].style.transition = 'opacity 0.3s';
			divs[d].style.opacity = 1
		}

		this.isAllHidden = false;
	}

	this.displayNewSessionText = function() {
		$('#session #add-button').fadeOut(50)
		$('#newSessionText').fadeIn()
		$('#newSessionText').focus()
		$('#pressEnterToSaveSession').fadeIn()
	}

	this.hideNewSessionText = function() {
		$('#newSessionText').fadeOut(50);
		$('#newSessionText').val('')
		$('#pressEnterToSaveSession').fadeOut(50);
		$('#session #add-button').fadeIn();
	}

	this.displayNewTimeText = function() {
		$('#history tr:last-child').replaceWith(this.newTimeTextHTML)
		$('#newTimeText').focus()
	}

	this.hideNewTimeText = function() {
		$('#history tr:last-child').replaceWith(this.newTimeButtonHTML)
	}

	this.newSession = function(event, name) {
		if (event.keyCode == 27) {// ESC
			this.hideNewSessionText()
			return
		}
		if (event.keyCode == 13) {// enter key
			if (name.trim() == '') return
			this.hideNewSessionText()
			Data.newSession(name)
		}
	}

	this.newTime = function(event, time) {
		if (event.keyCode == 27) {// ESC
			this.hideNewTimeText()
			return
		}
		if (event.keyCode == 13) {// enter key
			if (time.trim() == '') return
			re = /^([0-9]{2}):([0-5])([0-9])\.([0-9]{2})$/
			if (! time.match(re)) {
				alert('Wrong time format (00:00.00)')
				return
			}
			this.hideNewTimeText()
			Data.manualAdd(time)
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
	 Data.save()
	 this.changeChronoColor(-1)
	}
}
