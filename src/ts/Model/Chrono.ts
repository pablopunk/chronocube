
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

    constructor(type = ChronoType.Timer) {
        this.type = type;
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
        this.startTime = new Date();
        this.loop();
    }

    stop()
    {
        clearTimeout(this.timerId);
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
            this.timerId = setTimeout(() => this.loop(), 10); // keep in loop
        }
        this.helper.show(this.sec.toString());
    }

    dump() {
        console.log('#Chrono');
        console.log('@Type: ' + this.type);
    }
}