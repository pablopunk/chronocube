
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

    document.getElementById('importFile').addEventListener("change", evt = function() {
      Data.importTimes(evt)
    });
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
    }
    else {
      this.solves = JSON.parse(localStorage.getItem('solves')) // JSON object in localstorage
      if (this.solves == null) this.solves = [new Solve('Default', [])]
    }
  }

  this.save = function() {
    if (this.solves == null) { // no solves
      localStorage['numberOfSolves'] = 1
      localStorage['solves'] = JSON.stringify([new Solve('Default', [])])
    } else {
      localStorage['numberOfSolves'] = this.solves.length
      localStorage['solves'] = JSON.stringify(this.solves)
    }
  }

  this.updateSolveName = function() {
    var content = ''
    for (i in this.solves) {
      if (this.currentSolve == this.solves[i].name) content += '<option selected>'+this.solves[i].name+'</option>'
      else content += '<option>'+this.solves[i].name+'</option>'
    }
    document.getElementById('solveNames').innerHTML = content
  }

  this.changeSolve = function() {
    // @implement when I change to another solve
    // I have to update this.currentSolve
    // and call this.refresh
  }

  this.getIndex = function(name) {
    for (i in this.solves) {
      if (this.solves[i].name == name) {
        return i
      }
    }
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
    // @debug
    console.log('times to iterate: '+times)
    for (i=0; i<times.length; i++) {
      if (i == best) {
          table += '<tr style="color:#44ff77"><td>'+(parseInt(i)+1)+'</td><td>'+times[i]+'</td><td onclick="Data.deleteTime('+i+')">X</td></tr>';
      } else {
          table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+times[i]+'</td><td onclick="Data.deleteTime('+i+')">X</td></tr>';
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
      document.getElementById('average-all').innerHTML = "Average All: " + this.getAverage(times.length)
      if (times.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + this.getAverage(5);
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

  // get average of last 'size' solves -> if size==average.length, then it returns all solves average
  this.getAverage = function(size) {
    var times = this.solves[this.getIndex(this.currentSolve)].times
    var i=0, average=0, min=0, sec=0, dec=0;
    for (i=times.length-size; i<times.length; i++) {
      min = parseInt(times[i].charAt(0)+times[i].charAt(1))
      sec = parseInt(times[i].charAt(3)+times[i].charAt(4))
      dec = parseInt(times[i].charAt(6)+times[i].charAt(7))
      // average in decimals
      average += ( (min*60*100) + (sec*100) + dec)
    }
    average /= size
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
    csvContent += this.savedTimes[i]+";"+this.getAverage(this.savedTimes.length)+(this.savedTimes.length>4 ? ";"+this.getAverage(5)+"\n" : "\n")
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
    csvContent += this.savedTimes[i]+"\t"+this.getAverage(this.savedTimes.length)+(this.savedTimes.length>4 ? "\t"+this.getAverage(5)+"\n" : "\n")
    for (i=1; i<this.savedTimes.length;i++) {
      csvContent += this.savedTimes.length ? this.savedTimes[i] + "\n" : this.savedTimes[i];
    }

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  this.importTimes = function(evt) {
    alert("This feature will be available soon :)")
  }
}
