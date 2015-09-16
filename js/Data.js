
function DataManager() {
  this.savedTimes = []

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

    this.savedTimes = this.restoreFromStorage();
    if (this.savedTimes == null) this.savedTimes = [];
    this.updateTimes()
    MainLayout.scrollDown()
  }

  this.saveTime = function() {
    var currentTime = document.getElementById("chronotime").innerHTML
    if (this.savedTimes == null) this.savedTimes = [];
    this.savedTimes.push(currentTime)
    MainLayout.scrollDown()
  }

  this.updateTimes = function() {
    var best = this.getBestTime();
    var table = '';
    for (i in this.savedTimes) {
      if (i == best) {
          table += '<tr style="color:#44ff77"><td>'+(parseInt(i)+1)+'</td><td>'+this.savedTimes[i]+'</td><td onclick="Data.deleteTime('+i+')">X</td></tr>';
      } else {
          table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+this.savedTimes[i]+'</td><td onclick="Data.deleteTime('+i+')">X</td></tr>';
      }
    }
    document.getElementById('savedTimes').innerHTML = table
    this.saveTimesToStorage()

    if (this.savedTimes.length == 0) {
      document.getElementById('best-solve').innerHTML = "Best: -"
      document.getElementById('average-all').innerHTML = "Average All: -"
      document.getElementById('average-5').innerHTML = "Average 5: -"
    }
    else {
      // display scores
      document.getElementById('best-solve').innerHTML = "Best: "+ this.savedTimes[best]
      document.getElementById('average-all').innerHTML = "Average All: " + this.getAverage(this.savedTimes.length)
      if (this.savedTimes.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + this.getAverage(5);
      else document.getElementById('average-5').innerHTML = "Average 5: -"
    }

  }

  this.deleteTime = function(index) {
    this.savedTimes.splice(parseInt(index), 1);
    this.updateTimes();
  }

  this.saveTimesToStorage = function() {
    localStorage["savedTimes"] = JSON.stringify(this.savedTimes)
  }

  this.restoreFromStorage = function() {
    // return ( localStorage.getItem('savedTimes') == 'undefined' ? [] : JSON.parse(localStorage.getItem("savedTimes")) )
    if (localStorage.getItem("savedTimes") == 'undefined') return [];
    else return JSON.parse(localStorage.getItem("savedTimes"));
  }

  this.saveBackground = function() {
    localStorage['bgIndex'] = (""+MainLayout.backgroundSelected)
  }

  this.restoreBackground = function() {
    return ( (localStorage.getItem('bgIndex') == 'undefined' || isNaN(localStorage.getItem('bgIndex'))) ? 0 : parseInt(localStorage.getItem('bgIndex')) )
  }

  // index of the best time in the array
  this.getBestTime = function() {
    var best = 0; // index 0
    var i = 1;
    for (i=1; i<this.savedTimes.length; i++) {
      var old = this.getIntFromTimeString(this.savedTimes[best])
      var cur = this.getIntFromTimeString(this.savedTimes[i])

      if (cur < old) best = i;
    }

    return best;
  }

  // get average of last 'size' solves -> if size==average.length, then it returns all solves average
  this.getAverage = function(size) {
    var i=0, average=0, min=0, sec=0, dec=0;
    for (i=this.savedTimes.length-size; i<this.savedTimes.length; i++) {
      min = parseInt(this.savedTimes[i].charAt(0)+this.savedTimes[i].charAt(1))
      sec = parseInt(this.savedTimes[i].charAt(3)+this.savedTimes[i].charAt(4))
      dec = parseInt(this.savedTimes[i].charAt(6)+this.savedTimes[i].charAt(7))
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

  this.downloadtxt = function() {
      this.exportTimesToTxt()
      MainLayout.hideDownloadOptions()
   }

  this.downloadcsv = function() {
      this.exportTimesToCsv()
      MainLayout.hideDownloadOptions()
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
    // var files = evt.target.files; // FileList object
    // var file = files[0] // file to import
    // var reader = new FileReader();
    // var text = ""

    alert("This feature will be available soon :)")

    // reader.onload = function() {
   //     text = event.target.result;
   //     var data = JSON.parse(text)
   //     console.log(data)
    // }
    // reader.readAsText(file);
  }
}

