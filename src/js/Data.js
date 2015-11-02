
function Solve(name, times) {
  this.name = name
  this.times = times
}

function DataManager() {
  this.solves = [] // array of Solve objects
  this.numberOfSolves = 0 // solves loaded into the app !! not the actual number (solves.length)
  this.currentSolve = 'Default' // @implement save and load currentSolve in localstorage

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

    //document.getElementById('importFile').addEventListener("change", evt = function() {
    //  Data.importTimes(evt)
    //});
    document.getElementById('solve')

    // load number of solves stored
    this.numberOfSolves = localStorage.getItem('numberOfSolves')
    if (this.numberOfSolves == null) this.numberOfSolves = 0
    // load solves from storage
    this.load()
    this.refresh()
    MainLayout.scrollDown()
  }

  this.load = function() {
    if (this.numberOfSolves == 0) {
      this.solves = [new Solve('Default', [])]
      this.numberOfSolves = 1
      this.currentSolve = 'Default'
    }
    else {
      this.solves = JSON.parse(localStorage.getItem('solves')) // JSON object in localstorage
      if (this.solves == null) this.solves = [new Solve('Default', [])]
      this.currentSolve = localStorage['currentSolve']
      if (this.currentSolve == null) this.currentSolve = 'Default'
    }
  }

  this.save = function() {
    if (this.solves == null) { // no solves
      localStorage['numberOfSolves'] = 1
      localStorage['solves'] = JSON.stringify([new Solve('Default', [])])
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
    $('#solveNames').select2("close");
  }

  this.delSolve = function() {
    if (confirm ("Are you sure to delete this Solve class?")) {
      var index = $("select[id='solveNames'] option:selected").index()
      this.solves.splice(parseInt(index), 1)
      if (this.solves.length == 0) {
        this.solves[0] = new Solve('Default', [])
        this.currentSolve = 'Default'
      } else {
        this.currentSolve = this.solves[0].name
      }
      this.refresh()
    }
  }

  this.getIndex = function(name) {
    var exists = "no"
    for (var i=0; i<this.solves.length; i++) {
      if (this.solves[i].name == name) {
        exists = "yes"; break
      }
    }
    if (exists == "yes") return i;
    else return -1;
  }

  this.add = function() {
    var currentTime = document.getElementById("chronotime").innerHTML
    this.solves[this.getIndex(this.currentSolve)].times.push(currentTime)
    MainLayout.scrollDown()
  }

  this.refresh = function() {
    if (this.solves.length == 0) return;
    var best = this.getBestTime();
    var table = '';
    var times = this.solves[this.getIndex(this.currentSolve)].times
    for (var i=0; i<times.length; i++) {
      if (i == best) {
          table += '<tr style="color:#44ff77"><td>'+(parseInt(i)+1)+'</td><td>'+times[i]+'</td><td onclick="Data.deleteTime('+i+')"><img src="img/x.png"/></td></tr>';
      } else {
          table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+times[i]+'</td><td onclick="Data.deleteTime('+i+')"><img src="img/x.png"/></td></tr>';
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
      document.getElementById('best-solve').innerHTML = "Best: "+ times[best]
      document.getElementById('average-all').innerHTML = "Average All: " + this.getAverageAll()
      if (times.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + this.getAverage5();
      else document.getElementById('average-5').innerHTML = "Average 5: -"
    }
  }

  this.deleteTime = function(index) {
    this.solves[this.getIndex(this.currentSolve)].times.splice(parseInt(index), 1)
    this.refresh();
  }

  this.saveBackground = function() {
    localStorage['bgIndex'] = (""+MainLayout.backgroundSelected)
  }

  this.restoreBackground = function() {
    return ( (localStorage.getItem('bgIndex') == 'undefined' || isNaN(localStorage.getItem('bgIndex'))) ? 0 : parseInt(localStorage.getItem('bgIndex')) )
  }

  // index of the best time in the array
  this.getBestTime = function() {
    var times = this.solves[this.getIndex(this.currentSolve)].times
    var best = 0; // index 0
    var i = 1;
    for (i=1; i<times.length; i++) {
      var old = this.getIntFromTimeString(times[best])
      var cur = this.getIntFromTimeString(times[i])

      if (cur < old) best = i;
    }

    return best;
  }

  this.getAverageAll = function() {
    var times = this.solves[this.getIndex(this.currentSolve)].times
    var i=0, average=0, min=0, sec=0, dec=0;
    for (i=0; i<times.length; i++) {
      min = parseInt(times[i].charAt(0)+times[i].charAt(1))
      sec = parseInt(times[i].charAt(3)+times[i].charAt(4))
      dec = parseInt(times[i].charAt(6)+times[i].charAt(7))
      // average in decimals
      average += ( (min*60*100) + (sec*100) + dec)
    }
    average /= times.length
    average = average.toFixed(0);

    return this.getAverageStringFromDec(average)
  }

  this.getAverage5 = function() {
    var times = this.solves[this.getIndex(this.currentSolve)].times
    var i=0, average=0, min=0, sec=0, dec=0;
    times = times.slice(times.length-5, times.length)
    times.sort()
    for (i=1; i<times.length-1; i++) {
      min = parseInt(times[i].charAt(0)+times[i].charAt(1))
      sec = parseInt(times[i].charAt(3)+times[i].charAt(4))
      dec = parseInt(times[i].charAt(6)+times[i].charAt(7))
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
      return "00:" + seconds + ":" + decimals
    } // else

    var minutes = Math.floor(dec / 6000);
    var seconds = ((dec % 6000) / 100).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + decimals;
  }

  this.getIntFromTimeString = function(time) {

    var r = time.replace(/:/g, ''); // removes ':'

    return parseInt(r);
  }

  this.downloadtxt = function() {
      alert("This feature will be available soon :)")
      //this.exportTimesToTxt() @implement with the new objects
      MainLayout.hideDownloadOptions()
   }

  this.downloadcsv = function() {
      alert("This feature will be available soon :)")
      //this.exportTimesToCsv() @implement with the new objects
      MainLayout.hideDownloadOptions()
  }

  this.exportTimesToCsv = function() {
    if (this.savedTimes.length==0) {
      Error.print('No solves yet')
      return;
    }
    var csvContent = "data:text/csv;charset=utf-8,";
    var i = 0;

    csvContent += "All solves;Average All"+(this.savedTimes.length>4 ? ";Average 5\n" : "\n")
    csvContent += this.savedTimes[i]+";"+this.getAverageAll()+(this.savedTimes.length>4 ? ";"+this.getAverage5()+"\n" : "\n")
    for (i=1; i<this.savedTimes.length;i++) {
      csvContent += this.savedTimes.length ? this.savedTimes[i] + "\n" : this.savedTimes[i];
    }

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  this.exportTimesToTxt = function() {
    if (this.savedTimes.length==0) {
      Error.print('No solves yet')
      return;
    }
    var csvContent = "data:text/txt;charset=utf-8,";
    var i = 0;

    csvContent += "All solves\tAverage All"+(this.savedTimes.length>4 ? "\tAverage 5\n" : "\n")
    csvContent += this.savedTimes[i]+"\t"+this.getAverageAll()+(this.savedTimes.length>4 ? "\t"+this.getAverage5()+"\n" : "\n")
    for (i=1; i<this.savedTimes.length;i++) {
      csvContent += this.savedTimes.length ? this.savedTimes[i] + "\n" : this.savedTimes[i];
    }

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  this.importTimes = function(evt) {
    alert("This feature will be available soon :)")
  }

  this.newSolve = function(name) {
    if (this.getIndex(name) == -1) { // it does not exists yet
      this.currentSolve = name
      this.solves.push(new Solve(name, []))
      this.refresh()
    }
  }
}
