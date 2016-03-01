
function SolveTime(time, scramble) { // solve time object
  this.time = time
  this.scramble = scramble
}

function Solve(name) { // session object (multiple times)
  this.name = name
  this.times = []
}

function DataManager() {
  this.solves = [] // array of Solve objects
  this.numberOfSolves = 0 // solves loaded into the app !! not the actual number (solves.length)
  this.currentSolve = 'Default'
  this.deleted = [] // list of deleted solves to undo
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
    this.numberOfSolves = localStorage.getItem('numberOfSolves')
    if (this.numberOfSolves == null) this.numberOfSolves = 0
    // load solves from storage
    this.load()
    this.refresh()
    MainLayout.scrollDown()
  }

  this.resetSolves = function() {
    this.currentSolve = 'Default'
    this.solves = [new Solve('Default', [])]
    this.numberOfSolves = 1
  }

  this.load = function() {
    if (this.numberOfSolves == 0) {
      this.resetSolves()
    }
    else {
      // checks for old solves and converts them
      if (localStorage.getItem('solves') == null) {
        this.resetSolves()
        return
      }
      if (typeof(JSON.parse(localStorage.getItem('solves'))[0].times[0]) == "string") { // old solves
        var slvs = JSON.parse(localStorage.getItem('solves')) // all solves
        var nslvs = Object.keys(slvs).length
        for (var i=0; i<nslvs; i++) { // iterate solves
          var n = new Solve(slvs[i].name)
          for (var j=0; j<slvs[i].times.length; j++) {
            n.times.push(new SolveTime(slvs[i].times[j],'no scramble for this solve'))
          }
          this.solves.push(n)
        }
      } else { // new solves with scrambles
        this.solves = JSON.parse(localStorage.getItem('solves')) // JSON object in localstorage
      }
      this.currentSolve = localStorage['currentSolve']
      if (this.solves == null) {
        this.resetSolves()
      }
    }
  }

  this.save = function() {
    if (this.solves == null) { // no solves
      localStorage['numberOfSolves'] = 1
      localStorage['solves'] = JSON.stringify([new Solve('Default')])
      localStorage['currentSolve'] = 'Default'
    } else {
      localStorage['numberOfSolves'] = this.solves.length
      localStorage['solves'] = JSON.stringify(this.solves)
      localStorage['currentSolve'] = this.currentSolve
    }
  }

  this.updateSolveName = function() {
    var content = ''
    for (var i=0; i<this.solves.length; i++) {
      if (this.currentSolve == this.solves[i].name) content += '<option selected>'+this.solves[i].name+'</option>'
      else content += '<option>'+this.solves[i].name+'</option>'
    }
    document.getElementById('solveNames').innerHTML = content
    $('#solveNames').select2({
  			minimumResultsForSearch: Infinity,
				theme: "classic"
		});
  }

  this.changeSolve = function(index) {
    this.currentSolve = this.solves[index].name
    this.refresh()
    MainLayout.hideUndoDelete()
    $('#solveNames').select2("close");
  }

  this.delSolve = function() {
    if (confirm ("Are you sure to delete this Solve class?")) {
      var index = $("select[id='solveNames'] option:selected").index()
      this.solves.splice(parseInt(index), 1)
      if (this.solves.length == 0) {
        this.solves[0] = new Solve('Default')
        this.currentSolve = 'Default'
      } else {
        this.currentSolve = this.solves[0].name
      }
      this.refresh()
      MainLayout.hideUndoDelete()
    }
  }

  this.getIndex = function(name) {
    var exists = false
    for (var i=0; i<this.solves.length; i++) {
      if (this.solves[i].name == name) {
        exists = true; break
      }
    }
    if (exists) return i;
    else return -1;
  }

  this.getCurrentSolve = function() {
    return this.solves[this.getIndex(this.currentSolve)]
  }

  this.add = function() {
    var currentTime = document.getElementById("chronotime").innerHTML
    MainLayout.updateScramble()
    this.getCurrentSolve().times.push(new SolveTime(currentTime, this.lastScramble))
    MainLayout.scrollDown()
  }

  this.refresh = function() {
    if (this.solves.length == 0) return;
    var best = this.getBestTime();
    var table = '';
    var times = this.getCurrentSolve().times
    for (var i=0; i<times.length; i++) {
      if (i == best) {
          table += "<tr id='time"+i+"' style='color:#44ff77' onmouseover='MainLayout.showScrambleForTime("+i+")' onmouseout='MainLayout.hideScrambleForTime("+i+")'><td>"+(parseInt(i)+1)+"</td><td>"+times[i].time+"</td><td onclick='Data.deleteTime("+i+")'><i class='fa fa-times'></i></td></tr>";
      } else {
          table += "<tr id='time"+i+"' onmouseover='MainLayout.showScrambleForTime("+i+")' onmouseout='MainLayout.hideScrambleForTime("+i+")'><td>"+(parseInt(i)+1)+"</td><td>"+times[i].time+"</td><td onclick='Data.deleteTime("+i+")'><i class='fa fa-times'></i></td></tr>";
      }
    }
    document.getElementById('times-table').innerHTML = table
    this.save()
    this.updateSolveName()

    if (times.length == 0) {
      document.getElementById('best-solve').innerHTML = "Best: -"
      document.getElementById('average-all').innerHTML = "Average All: -"
      document.getElementById('average-5').innerHTML = "Average 5: -"
    }
    else {
      // display scores
      document.getElementById('best-solve').innerHTML = "Best: "+ times[best].time
      document.getElementById('average-all').innerHTML = "Average All: " + this.getAverageAll()
      if (times.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + this.getAverage5();
      else document.getElementById('average-5').innerHTML = "Average 5: -"
    }
  }

  this.deleteTime = function(index) {
    this.deleted.push(this.getCurrentSolve().times[index])
    this.getCurrentSolve().times.splice(parseInt(index), 1)
    this.refresh();
    MainLayout.showUndoDelete();
  }

  this.undoLastDelete = function() {
    this.getCurrentSolve().times.push(this.deleted.pop())
    this.refresh()
    MainLayout.scrollDown()
    if (this.deleted.length < 1) {
        MainLayout.hideUndoDelete();
    }
  }

  this.saveBackground = function() {
    localStorage['bgIndex'] = (""+MainLayout.backgroundSelected)
  }

  this.restoreBackground = function() {
    return ( (localStorage.getItem('bgIndex') == 'undefined' || isNaN(localStorage.getItem('bgIndex'))) ? 0 : parseInt(localStorage.getItem('bgIndex')) )
  }

  // index of the best time in the array
  this.getBestTime = function() {
    var times = this.getCurrentSolve().times
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
    var times = this.getCurrentSolve().times
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
    var times = this.getCurrentSolve().times
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
    if (this.getCurrentSolve().times.length==0) {
      Error.print('No solves yet')
      return;
    }
    var data = JSON.stringify(this.solves);
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
    var oldSolves = Object.assign({}, Data.solves); // save current solves for recovery
    var newSolves = null
    try {
        newSolves = JSON.parse(fr.result)
    } catch (e) {
        alert('That was not a JSON file, was it?')
        return;
    }
    if (newSolves[0].name == undefined || newSolves[0].times == undefined ) {
      alert('It was a JSON but there were not solves in it')
      return;
    }
    try {
      for (var i=0; i<newSolves.length; i++) {
        var s = newSolves[i]
        var index = Data.getIndex(s.name)
        Data.newSolve(s.name)
        console.log('solve '+s.name);
        for (var j=0; j<s.times.length; j++) {
          console.log('\ttime '+s.times[j].time);
          Data.solves[index].times.push(new SolveTime(s.times[j].time, s.times[j].scramble))
        }
      }
      Data.refresh()
    } catch(e) {
      Data.solves = oldSolves // recover
      alert('There was a problem uploading solves')
      console.log(e);
    }
  }

  this.newSolve = function(name) {
    if (this.getIndex(name) == -1) { // it does not exists yet
      this.currentSolve = name
      this.solves.push(new Solve(name))
      this.refresh()
    }
  }
}
