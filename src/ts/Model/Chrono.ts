
enum ChronoType {
    Timer = 1,
    Inspection
}

class Chrono {
    startTime :any;
    endTime :any;
    diff :any;
    timerId :number;
    dec :number;
    sec :number;
    min :number;
    type :ChronoType;

    constructor(type :ChronoType) {
        this.type = type;
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
            this.timerId = setTimeout('loop()', 10); // keep in loop
        }
        //TODO: update view
    }
}