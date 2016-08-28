
class ChronoHelper {

    model :Model;

    constructor(model :Model) {
        this.model = model;
        this.model.chrono.helper = this;
    }

    start() {
        document.getElementById('timer').style.color = 'black';
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

    getState() {
        return this.model.chrono.state;
    }

    setState(state :ChronoState) {
        this.model.chrono.state = state;
    }

    spaceStart() {
        if (this.getState() == ChronoState.SOLVING) {
            this.stop();
        } else if (this.getState() == ChronoState.STOPPED) { // holding for solve
            this.setState(ChronoState.HOLDING_SOLVE);
            document.getElementById('timer').style.color = 'lawngreen';
        }
    }

    spaceEnd() {
        if (this.getState() == (ChronoState.STOPPED | ChronoState.HOLDING_SOLVE)) {
            this.start();
        }
    }
}