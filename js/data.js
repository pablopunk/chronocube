

var savedTimes = []
var scroll

function initData() {
  if(typeof(Storage) == "undefined") {
    // Sorry! No Web Storage support..
    printError('Sorry! No Web Storage support..');
  }
  if (typeof JSON === "undefined") {
    printError('JSON not supported')
  }
  scroll = document.getElementById('scroll')
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
  for (i in savedTimes) {
    table += '<tr><td>'+(parseInt(i)+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')">X</td></tr>';
  }
  document.getElementById('savedTimes').innerHTML = table
  saveToStorage()
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

function scrollDown() {
  scroll.scrollTop = scroll.scrollHeight;
}
