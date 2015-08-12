

var savedTimes = []

function initData() {
  if(typeof(Storage) == "undefined") {
    // Sorry! No Web Storage support..
    printError('Sorry! No Web Storage support..');
  }
  if (typeof JSON === "undefined") {
    printError('JSON not supported')
  }
  savedTimes = restoreFromStorage();
  updateTimes()
  scrollDown()
}

function saveTime() {
  var currentTime = document.getElementById("chronotime").innerHTML
  if (savedTimes == null) savedTimes = [];
  savedTimes.push(currentTime)
  scrollDown()
}

function updateTimes() {
  var best = getBestTime();
  var table = '';
  for (i in savedTimes) {
    if (i == best) {
        table += '<tr style="color:#44ff77"><td>'+(parseInt(i)+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')">X</td></tr>';
    } else {
        table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')">X</td></tr>';
    }
  }
  document.getElementById('savedTimes').innerHTML = table
  saveToStorage()

  if (savedTimes.length == 0) {
    document.getElementById('best-solve').innerHTML = "Best: -"
    document.getElementById('average-all').innerHTML = "Average All: -"
    document.getElementById('average-5').innerHTML = "Average 5: -"
  }
  else {
    // display scores
    document.getElementById('best-solve').innerHTML = "Best: "+ savedTimes[best]
    document.getElementById('average-all').innerHTML = "Average All: " + getAverage(savedTimes.length)
    if (savedTimes.length>4) document.getElementById('average-5').innerHTML = "Average 5: " + getAverage(5);
    else document.getElementById('average-5').innerHTML = "Average 5: -"
  }

}

function deleteTime(index) {
  savedTimes.splice(parseInt(index), 1);
  updateTimes();
}

function saveToStorage() {
  localStorage["savedTimes"] = JSON.stringify(savedTimes)
}

function restoreFromStorage() {
  if (localStorage.getItem("savedTimes") == 'undefined') return [];
  else return JSON.parse(localStorage.getItem("savedTimes"));
}

function scrollUp() {
  var scroll = document.getElementById('scroll-child')
  scroll.scrollTop = 0;
}

function scrollDown() {
  var scroll = document.getElementById('scroll-child')
  scroll.scrollTop = scroll.scrollHeight;
}

// index of the best time in the array
function getBestTime() {
  var best = 0; // index 0
  var i = 1;
  for (i=1; i<savedTimes.length; i++) {
    var old = getIntFromTimeString(savedTimes[best])
    var cur = getIntFromTimeString(savedTimes[i])

    if (cur < old) best = i;
  }

  return best;
}

// get average of last 'size' solves -> if size==average.length, then it returns all solves average
function getAverage(size) {
  var i=0, average=0, min=0, sec=0, dec=0;
  for (i=savedTimes.length-size; i<savedTimes.length; i++) {
    min = parseInt(savedTimes[i].charAt(0)+savedTimes[i].charAt(1))
    sec = parseInt(savedTimes[i].charAt(3)+savedTimes[i].charAt(4))
    dec = parseInt(savedTimes[i].charAt(6)+savedTimes[i].charAt(7))
    // average in decimals
    average += ( (min*60*100) + (sec*100) + dec)
  }
  average /= size
  average = average.toFixed(0);

  return getAverageStringFromDec(average)
}

function getAverageStringFromDec(dec) {
  var minutes = Math.floor(dec / 6000);
  var seconds = ((dec % 6000) / 100).toFixed(0);
  var decString = ""+dec;
  var l = decString.length;
  var decimals = decString.charAt(l-2) + decString.charAt(l-1) // last two digits

  if (dec < 100) seconds = 0; // seconds fix

  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + decimals;
}

function getIntFromTimeString(time) {

  var r = time.replace(/:/g, ''); // removes ':'

  return parseInt(r);
}

function exportTimesToCsv() {
  if (savedTimes.length==0) return;
  var csvContent = "data:text/csv;charset=utf-8,";
  var i = 0;

  csvContent += "All solves;Average All"+(savedTimes.length>4 ? ";Average 5\n" : "\n")
  csvContent += savedTimes[i]+";"+getAverage(savedTimes.length)+(savedTimes.length>4 ? ";"+getAverage(5)+"\n" : "\n")
  for (i=1; i<savedTimes.length;i++) {
    csvContent += savedTimes.length ? savedTimes[i] + "\n" : savedTimes[i];
  }

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

function exportTimesToTxt() {
  if (savedTimes.length==0) return;
  var csvContent = "data:text/txt;charset=utf-8,";
  var i = 0;

  csvContent += "All solves\tAverage All"+(savedTimes.length>4 ? "\tAverage 5\n" : "\n")
  csvContent += savedTimes[i]+"\t"+getAverage(savedTimes.length)+(savedTimes.length>4 ? "\t\t"+getAverage(5)+"\n" : "\n")
  for (i=1; i<savedTimes.length;i++) {
    csvContent += savedTimes.length ? savedTimes[i] + "\n" : savedTimes[i];
  }

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}
