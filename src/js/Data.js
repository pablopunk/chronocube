
function Time(time, scramble) { // solve time object
  this.time = time
  this.scramble = scramble
}

function Session(name) { // session object (multiple times)
  this.name = name
  this.times = []
}

function DataManager() {
  this.sessions = [] // array of Session objects
  this.numberOfSessions = 0 // solves loaded into the app !! not the actual number (solves.length)
  this.currentSession = 'Default'
  this.lastScramble = ''
  this.file = null
  this.fr = null

  this.init = function() {
    if(typeof(Storage) == "undefined") {
      // Sorry! No Web Storage support..
      Error.print('Sorry! No Web Storage support..');
    }
    if (typeof JSON === "undefined") {
      Error.print('JSON not supported')
    }

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      Error.print('Sorry, no html5 support in this browser')
    }

    document.getElementById('uploadjsoninput').addEventListener("change", evt = function() {
     Data.uploadjson(evt)
    });

    // load number of solves stored
    this.numberOfSessions = localStorage.getItem('numberOfSessions')
    if (this.numberOfSessions == null) this.numberOfSessions = 0
    // load solves from storage
    this.load()
    this.refresh()
    MainLayout.scrollHistoryDown()
  }

  this.resetSessions = function() {
    this.currentSession = 'Default'
    this.sessions = [new Session('Default', [])]
    this.numberOfSessions = 1
  }

  this.load = function() {
    if (this.numberOfSessions == 0) {
      this.resetSessions()
    }
    else {
      // checks for old solves and converts them
      if (localStorage.getItem('sessions') == null) {
        this.resetSessions()
        return
      }
      if (typeof(JSON.parse(localStorage.getItem('sessions'))[0].times[0]) == "string") { // old solves
        var slvs = JSON.parse(localStorage.getItem('sessions')) // all solves
        var nslvs = Object.keys(slvs).length
        for (var i=0; i<nslvs; i++) { // iterate solves
          var n = new Session(slvs[i].name)
          for (var j=0; j<slvs[i].times.length; j++) {
            n.times.push(new Time(slvs[i].times[j],'no scramble for this solve'))
          }
          this.sessions.push(n)
        }
      } else { // new solves with scrambles
        this.sessions = JSON.parse(localStorage.getItem('sessions')) // JSON object in localstorage
      }
      this.currentSession = localStorage['currentSession']
      if (this.sessions == null) {
        this.resetSessions()
      }
    }
  }

  this.save = function() {
    if (this.sessions == null) { // no solves
      localStorage['numberOfSessions'] = 1
      localStorage['sessions'] = JSON.stringify([new Session('Default')])
      localStorage['currentSession'] = 'Default'
    } else {
      localStorage['numberOfSessions'] = this.sessions.length
      localStorage['sessions'] = JSON.stringify(this.sessions)
      localStorage['currentSession'] = this.currentSession
    }
  }

  this.updateSessionName = function() {
    var content = ''
    for (var i=0; i<this.sessions.length; i++) {
      if (this.currentSession == this.sessions[i].name) content += '<option selected>'+this.sessions[i].name+'</option>'
      else content += '<option>'+this.sessions[i].name+'</option>'
    }
    document.getElementById('sessions').innerHTML = content
  }

  this.changeSession = function(index) {
    this.currentSession = this.sessions[index].name
    this.refresh()
  }

  this.delSolve = function() {
    if (confirm ("Are you sure to delete this session?")) {
      var index = $("select[id='sessions'] option:selected").index()
      this.sessions.splice(parseInt(index), 1)
      if (this.sessions.length == 0) {
        this.sessions[0] = new Session('Default')
        this.currentSession = 'Default'
      } else {
        this.currentSession = this.sessions[0].name
      }
      this.refresh()
    }
  }

  this.getIndex = function(name) {
    var exists = false
    for (var i=0; i<this.sessions.length; i++) {
      if (this.sessions[i].name == name) {
        exists = true; break
      }
    }
    if (exists) return i;
    else return -1;
  }

  this.getCurrentSession = function() {
    return this.sessions[this.getIndex(this.currentSession)]
  }

  this.add = function() {
    var currentTime = document.getElementById("timer").innerHTML
    MainLayout.updateScramble()
    this.getCurrentSession().times.push(new Time(currentTime, this.lastScramble))
    MainLayout.scrollHistoryDown()
  }

  this.refresh = function() {
    if (this.sessions.length == 0) return;
    var best = this.getBestTime();
    var table = '';
    var times = this.getCurrentSession().times
    for (var i=0; i<times.length; i++) {
      if (i == best) {
          table += '<tr style="color:green;font-size:110%;font-weight:bold;" id="time'+i+'" onmouseover="MainLayout.showScrambleForTime('+i+')" onmouseout="MainLayout.hideScrambleForTime('+i+')"><td>'+(i+1)+'</td><td>'+times[i].time+'</td><td><a href="javascript:Data.deleteTime('+i+')"><i class="icon ion-ios-close-outline"></i></a></td></tr>'
      } else {
          table += '<tr id="time'+i+'" onmouseover="MainLayout.showScrambleForTime('+i+')" onmouseout="MainLayout.hideScrambleForTime('+i+')"><td>'+(i+1)+'</td><td>'+times[i].time+'</td><td><a href="javascript:Data.deleteTime('+i+')"><i class="icon ion-ios-close-outline"></i></a></td></tr>'
      }
    }
    if (times.length == 0) {
      table = '<tbody><td>No data yet</td></tbody>'
    }
    $('#history').find('table').html(table)
    this.save()
    this.updateSessionName()

    // if (times.length == 0) {
    //   document.getElementById('best-solve').innerHTML = "Best: -"
    //   document.getElementById('average-all').innerHTML = "Average All: -"
    //   document.getElementById('average-5').innerHTML = "Average 5: -"
    // }
    // else {
    //   // display scores
    //   document.getElementById('best-solve').innerHTML = "Best: "+ times[best].time
    //   document.getElementById('average-all').innerHTML = "Average All: " + this.getAverageAll()
    //   if (times.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + this.getAverage5();
    //   else document.getElementById('average-5').innerHTML = "Average 5: -"
    // }
  }

  this.deleteTime = function(index) {
    this.getCurrentSession().times.splice(parseInt(index), 1)
    this.refresh();
  }

  // index of the best time in the array
  this.getBestTime = function() {
    var times = this.getCurrentSession().times
    var best = 0; // index 0
    var i = 1;
    for (i=1; i<times.length; i++) {
      var old = this.getIntFromTimeString(times[best].time)
      var cur = this.getIntFromTimeString(times[i].time)

      if (cur < old) best = i;
    }

    return best;
  }

  this.getAverageAll = function() {
    var times = this.getCurrentSession().times
    var i=0, average=0, min=0, sec=0, dec=0;

    for (i=0; i<times.length; i++) {
      min = parseInt(times[i].time.charAt(0)+times[i].time.charAt(1))
      sec = parseInt(times[i].time.charAt(3)+times[i].time.charAt(4))
      dec = parseInt(times[i].time.charAt(6)+times[i].time.charAt(7))
      // average in decimals
      average += ( (min*60*100) + (sec*100) + dec)
    }
    average /= times.length
    average = average.toFixed(0);

    return this.getAverageStringFromDec(average)
  }

  this.getAverage5 = function() {
    var times = this.getCurrentSession().times
    var i=0, average=0, min=0, sec=0, dec=0;
    times = times.slice(times.length-5, times.length)
    times.sort(function(a,b){ return a.toString().localeCompare(b) }) // custom sort
    for (i=1; i<times.length-1; i++) {
      min = parseInt(times[i].time.charAt(0)+times[i].time.charAt(1))
      sec = parseInt(times[i].time.charAt(3)+times[i].time.charAt(4))
      dec = parseInt(times[i].time.charAt(6)+times[i].time.charAt(7))
      // average in decimals
      average += ( (min*60*100) + (sec*100) + dec)
    }
    average /= 3
    average = average.toFixed(0);

    return this.getAverageStringFromDec(average)
  }

  this.getAverageStringFromDec = function(dec) {

    var decString = ""+dec;
    var l = decString.length;
    var decimals = decString.charAt(l-2) + decString.charAt(l-1) // last two digits

    if (dec < 100) {
      return "00:00:"+dec
    } // else

    if (dec < 6000) {
      var seconds = (dec < 1000 ? "0" + decString.charAt(0) : decString.charAt(0)+decString.charAt(1))
      return "00:" + seconds + "." + decimals
    } // else

    var minutes = Math.floor(dec / 6000);
    var seconds = ((dec % 6000) / 100).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + "." + decimals;
  }

  this.getIntFromTimeString = function(time) {

    var r1 = time.replace(/:/g, ''); // removes ':'
    var r2 =  r1.replace(/\./g, ''); // removes '.'

    return parseInt(r2);
  }

  this.downloadjson = function() {
    if (this.getCurrentSession().times.length==0) {
      Error.print('No solves yet')
      return;
    }
    var data = JSON.stringify(this.sessions);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
    window.open(url, '_blank');
    window.focus();
   }

  this.uploadjson = function(evt) {
    var input = document.getElementById('uploadjsoninput');
    if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = this.saveJsonSolves;
      fr.readAsText(file);
    }
  }

  this.saveJsonSolves = function() {
    var oldSessions = Object.assign({}, Data.sessions); // save current solves for recovery
    var newSessions = null
    try {
        newSessions = JSON.parse(fr.result)
    } catch (e) {
        alert('That was not a JSON file, was it?')
        return;
    }
    if (newSessions[0].name == undefined || newSessions[0].times == undefined ) {
      alert('It was a JSON but there were not solves in it')
      return;
    }
    try {
      for (var i=0; i<newSessions.length; i++) {
        var s = newSessions[i]
        Data.newSession(s.name) // could exist, in that case times are pushed to existing solve
        var index = Data.getIndex(s.name)
        for (var j=0; j<s.times.length; j++) {
          Data.sessions[index].times.push(new Time(s.times[j].time, s.times[j].scramble))
        }
      }
      Data.refresh()
    } catch(e) {
      Data.sessions = oldSessions // recover
      alert('There was a problem uploading solves')
      console.log(e);
    }
  }

  this.newSession = function(name) {
    if (this.getIndex(name) == -1) { // it does not exists yet
      this.currentSession = name
      this.sessions.push(new Session(name))
      this.refresh()
    }
  }
}
