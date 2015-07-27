
if(typeof(Storage) == "undefined") {
  // Sorry! No Web Storage support..
  printError('Sorry! No Web Storage support..');
}

var savedTimes = [];

function saveTime() {
  var currentTime = document.getElementById("chronotime").innerHTML
  // savedTimes = localStorage.getItem("savedTimes")
  // if (savedTimes == null) savedTimes = [];
  savedTimes.push(currentTime)
  localStorage.setItem("savedTimes", savedTimes)
  var scroll = document.getElementById('scroll')
  scroll.scrollTop = scroll.scrollHeight;
}

function updateTimes() {
  //savedTimes = localStorage.getItem("savedTimes")
  var table = '';
  for (i = 0; i < savedTimes.length; i++) {
    table += '<tr><td>'+(i+1)+'</td><td>'+savedTimes[i]+'</td><td onclick="deleteTime('+i+')" unselectable="on">X</td></tr>';
  }
  document.getElementById('savedTimes').innerHTML = table
}

function deleteTime(index) {
  savedTimes.splice(parseInt(index), 1);
  updateTimes();
}
