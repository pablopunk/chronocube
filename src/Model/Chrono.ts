import {ViewController}  from "../ViewController"
import {SettingsManager} from "./Settings"
import {Solve} from "../Model/Solve"

export const enum Status {
    Stopped = 0,
    HoldingInspection,
    Inspecting,
    HoldingSolve,
    Solving,
}

export class Chrono  {

    settingsManager :SettingsManager
    view :ViewController;
    regExp = new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)');
    classNames :string
    text :string
    spacePressed :boolean
    status: Status
    startTime :any
    endTime :any
    diff :any
    timerId :number
    dec :number
    sec :number
    min :number

    constructor(view = new ViewController(), settingsManager = new SettingsManager()) {
        this.view = view;
        this.text = "00:00.00";
        this.settingsManager = settingsManager
        this.spacePressed = false;
        this.status = Status.Stopped;
        this.startTime = this.endTime = this.diff = this.timerId = this.dec = this.sec = this.min = 0;
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
        this.view.addSolveAction(new Solve(this.min, this.sec, this.dec, this.view.getCurrentScramble()));
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
            this.timerId = setTimeout(() => this.loop(), 10); // keep in loop
        }
        this.view.renderChrono();
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
            this.status = (this.settingsManager.settings.Inspection ? Status.HoldingInspection : Status.HoldingSolve);
            break;
            default: // do nothing when holding
            break;
        }
        this.view.renderChrono();
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
}