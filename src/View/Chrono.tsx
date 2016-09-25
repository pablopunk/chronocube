import * as React from "react";

const enum Status {
    Stopped,
    HoldingInspection,
    Inspecting,
    HoldingSolve,
    Solving,
}

enum KeyType {
    SPACE = 32
}

export class Chrono extends React.Component<{},{}>  {
    status: Status;
    regExp :RegExp;
    inspection :Boolean = false;
    spacePressed :Boolean = false;
    classNames :string = 'container';
    startTime :any;
    endTime :any;
    diff :any;
    timerId :number;
    dec :number;
    sec :number;
    min :number;
    text :string;

    constructor() {
        super();
        this.status = Status.Stopped;
        this.min = this.sec = this.dec = 0;
        this.regExp = new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)');
        this.bindEventsToBody();
    }

    render() {
        var divStyle = {
            color: this.getStatusColor(),
            width: '100%',
            textAlign: 'center',
            fontSize: '10em',
            fontFamily: 'Digital, Monospace'
        };
        var min = (this.min > 0) ? this.min.toString() + ':' : ''; // don't show 0 minutes
        var dec = this.dec.toString().slice(0,2); // truncate decimals
        switch(this.status) {
            case Status.HoldingInspection:
            case Status.HoldingSolve:
            case Status.Inspecting:
            case Status.Solving:
            this.text = min+this.sec;
            break;

            case Status.Stopped:
            this.text = min+this.sec+'.'+dec;
            break;

            default:
            return (
                <div style={divStyle} className={this.classNames}>No status found</div>
            );
        }
        return (
            <div style={divStyle} className={this.classNames}>{this.text}</div>
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
        if (this.status != Status.Stopped) this.continue();
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
        if (this.status == Status.Inspecting && this.sec > 14 ) {
            clearTimeout(this.timerId);
        } else {
            this.timerId = setTimeout(() => this.loop(), 100); // keep in loop
        }
        this.setState({});
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
        if (key == KeyType.SPACE)
            if (this.spacePressed) // If I'm already holding space
                this.spaceEnd();
    }
    
    cb_keyDown(event :KeyboardEvent) {
        var key = event.which;
        if (key == KeyType.SPACE)
            if (!this.spacePressed) // If I'm not holding space already
                this.spaceStart();
    }

    spaceStart() {
        this.spacePressed = true;
        switch(this.status) {
            case Status.Inspecting:
            this.status = Status.HoldingSolve;
            break;
            case Status.Solving:
            this.stop();
            this.status = Status.Stopped;
            break;
            case Status.Stopped:
            this.min = this.sec = this.dec = 0;
            this.status = (this.inspection ? Status.HoldingInspection : Status.HoldingSolve);
            break;
            default: // do nothing when holding
            break;
        }
        this.setState({});
    }

    spaceEnd() {
        this.spacePressed = false;
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

    getStatusColor() {
        switch(this.status) {
            case Status.HoldingInspection:
            return 'yellow';
            case Status.HoldingSolve:
            return 'lawngreen';
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