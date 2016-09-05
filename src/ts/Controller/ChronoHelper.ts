
class ChronoHelper {

    model :Model;
    view :ViewController;
    regExp :RegExp;

    constructor(model :Model, view :ViewController) {
        this.model = model;
        this.view = view;
        this.model.chrono.helper = this;
        this.regExp = new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)');
    }

    start() {
        document.getElementById('timer').style.color = 'black';
        this.model.chrono.start();
    }

    stop() {
        this.model.chrono.stop();
        this.show();
    }

    show() {
        if (this.getState() == ChronoState.SOLVING) {
            this.showSolving();
        } else {
            this.showStopped();
        }
    }

    showSolving() {
        var html = '';
        if (this.min() > 0) html += this.min().toString();
        html += this.sec().toString();  
        this.view.showTime(html);
    }

    showStopped() {
        var html = '';
        if (this.min() > 0) html += this.min().toString();
        this.sec() > 10 ? html += this.sec().toString() : html += ('0' + this.sec().toString());
        html += ('.' + this.dec().toString());
        this.view.showTime(html);
    }

    getTimeString() :string {
        var min = (this.min() > 10) ? this.min() : '0'+this.min();
        var sec = (this.sec() > 10) ? this.sec() : '0'+this.sec();
        var dec = this.dec();

        return min+':'+sec+'.'+dec;
    }

    getState() {
        return this.model.chrono.state;
    }

    setState(state :ChronoState) {
        this.model.chrono.state = state;
    }

    min() {
        return this.model.chrono.min;
    }

    sec() {
        return this.model.chrono.sec;
    }

    dec() {
        var str = this.model.chrono.dec.toString();
        var int = str[0] + str[1];
        return parseInt(int);
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