
enum ChronoState {
  STOPPED = 0,
  HOLDING_INSPECTION,
  INSPECTING,
  HOLDING_SOLVE,
  SOLVING,
  SOLVED,
};

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

    constructor() {
        this.state = ChronoState.STOPPED;
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
        if (this.state == (ChronoState.STOPPED | ChronoState.HOLDING_SOLVE)) {
            this.state = ChronoState.SOLVING;
            this.startTime = new Date();
            this.loop();
        }
    }

    stop()
    {
        if (this.state == ChronoState.SOLVING) {
            this.state = ChronoState.STOPPED;
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
        this.helper.show();
    }
}