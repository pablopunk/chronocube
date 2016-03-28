
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
  this.ao = ['-','-','-'] // best global [ao5,ao12,aoAll]

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
    this.ao = ['-','-','-']
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
      this.ao = ( localStorage['ao'] == null ? ['-','-','-'] : JSON.parse(localStorage['ao']) )
      if (localStorage['theme'] == 'dark') MainLayout.changeTheme()
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
      localStorage['ao'] = JSON.stringify([])
      localStorage['theme'] = MainLayout.theme
    } else {
      localStorage['numberOfSessions'] = this.sessions.length
      localStorage['sessions'] = JSON.stringify(this.sessions)
      localStorage['currentSession'] = this.currentSession
      localStorage['ao'] = JSON.stringify(this.ao)
      localStorage['theme'] = MainLayout.theme
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

  this.deleteSession = function() {
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
    var best = this.getBestTimeSession();
    var table = '';
    var times = this.getCurrentSession().times
    var len = times.length
    for (var i=0; i<len; i++) {
      if (i == best) {
          table += '<tr style="color:#2ecc71;font-size:110%;font-weight:bold;" id="time'+i+'" onmouseover="MainLayout.showScrambleForTime('+i+')" onmouseout="MainLayout.hideScrambleForTime('+i+')"><td>'+(i+1)+'</td><td>'+times[i].time+'</td><td><a href="javascript:Data.deleteTime('+i+')"><i class="icon ion-ios-close-outline minus"></i></a></td></tr>'
      } else {
          table += '<tr id="time'+i+'" onmouseover="MainLayout.showScrambleForTime('+i+')" onmouseout="MainLayout.hideScrambleForTime('+i+')"><td>'+(i+1)+'</td><td>'+times[i].time+'</td><td><a href="javascript:Data.deleteTime('+i+')"><i class="icon ion-ios-close-outline minus"></i></a></td></tr>'
      }
    }
    if (len == 0) {
      table = '<tbody><td>No data yet</td></tbody>';
      $('#ao5').html('-')
      $('#ao12').html('-')
      $('#aoAll').html('-')
      $('#best').html('-')
      $('#best-best').html(this.getBestGlobalTime())
      this.ao[0] != '-' ? $('#ao5-best').html(this.ao[0]) : $('#ao5-best').html('-')
      this.ao[1] != '-' ? $('#ao12-best').html(this.ao[1]) : $('#ao12-best').html('-')
      this.ao[2] != '-' ? $('#aoAll-best').html(this.ao[2]) : $('#aoAll-best').html('-')
    }
    else {
      // display scores
      $('#best').html(times[best].time)
      len > 4 ? $('#ao5').html(this.getAverageOf(5)) : $('#ao5').html('-')
      len > 11 ? $('#ao12').html(this.getAverageOf(12)) : $('#ao12').html('-')
      len > 2 ? $('#aoAll').html(this.getAverageAll()) : $('#aoAll').html('-')
      $('#best-best').html(this.getBestGlobalTime())
      this.ao[0] != '-' ? $('#ao5-best').html(this.ao[0]) : $('#ao5-best').html('-')
      this.ao[1] != '-' ? $('#ao12-best').html(this.ao[1]) : $('#ao12-best').html('-')
      this.ao[2] != '-' ? $('#aoAll-best').html(this.ao[2]) : $('#aoAll-best').html('-')
    }

    $('#history').find('table').html(table)
    this.save()
    this.updateSessionName()
  }

  this.deleteTime = function(index) {
    this.getCurrentSession().times.splice(parseInt(index), 1)
    this.refresh();
  }

  // index of the best time in the array
  this.getBestTimeSession = function() {
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

  this.getBestGlobalTime = function() {
    len=this.sessions.length
    if (len == 0) return '-';

    var array = []
    for (var i=0; i<len; i++) {
      array.push(this.min(this.sessions[i].times))
    }
    array.sort();
    if (typeof array[0] == 'undefined') return '-';
    return array[0].time
  }

  this.getBestGlobalAverageAll = function() {
    this.getBestGlobalAverageOf(-1)
  }

  this.getBestGlobalAverageOf = function(ao) {
    if (ao == 5) return this.ao[0]
    if (ao == 12) return this.ao[1]
    return this.ao[2]
  }

  this.min = function(times) {
    times.sort(function(a,b){ return a.time.toString().localeCompare(b.time) })
    return times[0]
  }

  this.getAverageAll = function() {
    return this.getAverageOf(this.getCurrentSession().times.length)
  }

  this.getAverageOf = function(ao) {
    var times = this.getCurrentSession().times
    var i=0, average=0, min=0, sec=0, dec=0;
    times = times.slice(times.length-ao, times.length)
    times.sort(function(a,b){ return a.time.toString().localeCompare(b.time) }) // custom sort
    for (i=1; i<times.length-1; i++) {
      min = parseInt(times[i].time.charAt(0)+times[i].time.charAt(1))
      sec = parseInt(times[i].time.charAt(3)+times[i].time.charAt(4))
      dec = parseInt(times[i].time.charAt(6)+times[i].time.charAt(7))
      // average in decimals
      average += ( (min*60*100) + (sec*100) + dec)
    }
    average /= (ao-2)
    average = average.toFixed(0);
    average = this.getAverageStringFromDec(average)

    // update scores
    if (ao == 5 && (this.ao[0] == '-' || this.ao[0].localeCompare(average))) {
        this.ao[0] = average
    } else if (ao == 12 && (this.ao[1] == '-' || this.ao[1].localeCompare(average))) {
        this.ao[1] = average
    } else if (this.ao[2] == '-' || this.ao[2].localeCompare(average)) {
        this.ao[2] = average
    }

    return average
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
