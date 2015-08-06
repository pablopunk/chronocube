

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
  var table = '';
  var best = getBestTime()
  for (i in savedTimes) {
    if (i == best) {
        table += '<tr style="color:#44ff77"><td>'+(parseInt(i)+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')">X</td></tr>';
    } else {
        table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')">X</td></tr>';
    }
  }
  document.getElementById('savedTimes').innerHTML = table
  saveToStorage()

  // display best time
  document.getElementById('best-solve').innerHTML = "Best: "+ savedTimes[best]

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

function getIntFromTimeString(time) {
  var min, sec, dec;
  min = parseInt( time.charAt(0) + time.charAt(1) ) * 10000
  sec = parseInt( time.charAt(3) + time.charAt(4) ) * 100
  dec = parseInt( time.charAt(6) + time.charAt(7) )

  return min+sec+dec;
}
