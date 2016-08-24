
class ChronoHelper {

    model :Model;

    constructor(model :Model) {
        this.model = model;
        this.model.chrono.helper = this;
    }

    start() {
        this.model.chrono.start();
    }

    stop() {
        this.model.chrono.stop();
        this.show(this.getTimeString());
    }

    show(time :string) {
        document.getElementById('timer').innerText = time;
    }

    getTimeString() :string {
        var min = (this.model.chrono.min > 10) ? this.model.chrono.min : '0'+this.model.chrono.min;
        var sec = (this.model.chrono.sec > 10) ? this.model.chrono.sec : '0'+this.model.chrono.sec;
        var dec = this.model.chrono.dec;

        return min+':'+sec+'.'+dec;
    }
}