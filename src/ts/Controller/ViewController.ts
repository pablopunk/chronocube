
class ViewController {

    timerDivId :string;

    constructor() {
        this.timerDivId = 'timer';
    }

    showTime(time :string) {
        document.getElementById(this.timerDivId).innerText = time;
    }
}