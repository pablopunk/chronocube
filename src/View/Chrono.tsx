import * as React from "react";

const enum Status {
    Stopped,
    HoldingInspection,
    Inspecting,
    HoldingSolve,
    Solving,
}

const enum Type {
    NoInspection,
    Inspection
}

enum KeyType {
    SPACE = 32
}

export class Chrono extends React.Component<{},{}>  {
    status: Status;
    regExp :RegExp;
    type: Type;
    startTime :any;
    endTime :any;
    diff :any;
    timerId :number;
    dec :number;
    sec :number;
    min :number;
    text :string;
    color :string;

    constructor() {
        super();
        this.status = Status.Stopped;
        this.min = this.sec = this.dec = 0;
        this.regExp = new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)');
        this.bindEventsToBody();
    }

    render() {
        this.getStateColor();
        var divStyle = {
            color: this.getStateColor(),
            width: '100%',
            textAlign: 'center',
            fontSize: '10em',
            fontFamily: 'Digital, Monospace'
        };
        switch(this.status) {
            case Status.HoldingInspection:
            case Status.HoldingSolve:
            case Status.Inspecting:
            case Status.Solving:
            this.text = this.sec.toString();
            break;

            case Status.Stopped:
            var min = (this.min > 0) ? this.min.toString + ':' : '';
            this.text = min+this.sec+'.'+this.dec;
            break;

            default:
            return (
                <div style={divStyle}>No status found</div>
            );
        }
        return (
            <div style={divStyle}>{this.text}</div>
        );
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
        if (this.status == (Status.Stopped | Status.HoldingSolve)) {
            this.status = Status.Solving;
            this.startTime = new Date();
            this.loop();
        }
    }

    stop()
    {
        if (this.status == Status.Solving) {
            this.status = Status.Stopped;
            clearTimeout(this.timerId);
        }
    }

    reset()
    {
        this.startTime = new Date();
    }

    continue()
    {
        if (this.type == Type.Inspection && this.sec > 14 ) {
            clearTimeout(this.timerId);
        } else {
            this.timerId = setTimeout(() => this.loop(), 100); // keep in loop
        }
        this.render();
    }

    bindEventsToBody() {
        document.body.addEventListener("keyup", e => this.cb_keyUp(e));
        document.body.addEventListener("keydown", e => this.cb_keyDown(e));
        // document.getElementById('toucharea').addEventListener('touchstart', this.keyDown);
        // document.addEventListener('touchstart', this.screenTouchDown);
        // document.getElementById('toucharea').addEventListener('touchend', this.keyUp);
        // document.addEventListener('touchend', this.screenTouchUp);
    }

    cb_keyUp(event :KeyboardEvent) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.spaceEnd();
        }
    }
    
    cb_keyDown(event :KeyboardEvent) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.spaceStart();
        }
    }

    spaceStart() {
        switch(this.status) {
            case Status.Inspecting:
            this.status = Status.HoldingSolve;
            this.stop();
            break;
            case Status.Solving:
            this.status = Status.Stopped;
            this.stop();
            break;
            case Status.Stopped:
            this.status = (this.type == Type.Inspection ? Status.HoldingInspection : Status.HoldingSolve);
            break;
            default: // do nothing when holding
            break;
        }
    }

    spaceEnd() {
        switch(this.status) {
            case Status.HoldingInspection:
            this.status = Status.Inspecting;
            this.start();
            break;
            case Status.HoldingSolve:
            this.status = Status.Solving;
            this.start();
            break;
            default: // do nothing
            break;
        }
    }

    getStateColor() {
        switch(this.status) {
            case Status.HoldingInspection:
            return 'yellow';
            case Status.HoldingSolve:
            return 'lawn green';
            case Status.Inspecting:
            return 'orange';
            case Status.Solving:
            return 'cyan';
            case Status.Stopped:
            return 'black';
            default:
            return 'red';
        }
    }
}

export default Chrono;