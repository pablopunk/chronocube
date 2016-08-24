
enum ChronoState {
    Stopped = 0,
    Running
}

enum ChronoType {
    Timer = 1,
    Inspection
}

class Chrono implements Dump {
    helper :ChronoHelper;
    startTime :any;
    endTime :any;
    diff :any;
    timerId :number;
    dec :number;
    sec :number;
    min :number;
    type :ChronoType;
    state :ChronoState;

    constructor(type = ChronoType.Timer) {
        this.type = type;
        this.state = ChronoState.Stopped;
        this.dec = this.sec = this.min = 0;
    }

    loop()
    {
        this.endTime = new Date();
        this.diff = this.endTime - this.startTime;
        this.diff = new Date(this.diff);
        this.dec = this.diff.getMilliseconds();
        this.sec = this.diff.getSeconds();
        this.min = this.diff.getMinutes();
        this.continue();
    }

    start()
    {
        if (this.state == ChronoState.Stopped) {
            this.state = ChronoState.Running;
            this.startTime = new Date();
            this.loop();
        }
    }

    stop()
    {
        if (this.state == ChronoState.Running) {
            this.state = ChronoState.Stopped;
            clearTimeout(this.timerId);
        }
    }

    reset()
    {
        this.startTime = new Date();
    }

    continue()
    {
        if (this.type == ChronoType.Inspection && this.sec > 14 ) {
            clearTimeout(this.timerId);
        } else {
            this.timerId = setTimeout(() => this.loop(), 100); // keep in loop
        }
        this.helper.show(this.sec.toString());
    }

    dump() {
        console.log('#Chrono');
        console.log('@Type: ' + this.type);
    }
}