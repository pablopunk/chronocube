import * as React from "react";
import {Solve} from "../Model/Solve"
import {Status} from "../Model/Chrono";
import {SettingsManager} from "../Model/Settings"

export interface ChronoProps {
    settingsManager :SettingsManager,
    status: Status,
    solve: Solve
}

export class ChronoElement extends React.Component<ChronoProps,{}>  {

    text :string

    render() {
        var divStyle = {
            color: this.getStatusColor(),
            width: '100%',
            textAlign: 'center',
            fontSize: '12em',
            fontFamily: 'Digital, Monospace'
        };

        if (this.props.status == Status.Solving && this.props.settingsManager.settings["Hide Timer"]) {
            return (
                <div style={divStyle}><i className="ion-ios-stopwatch"></i></div>
            );
        }
        
        switch(this.props.status) {
            case Status.HoldingInspection:
            case Status.HoldingSolve:
            case Status.Inspecting:
            case Status.Solving:
            this.text = this.props.solve.getTimeShort(true)
            break;

            case Status.Stopped:
            this.text = this.props.solve.getTimeShort()
            break;

            default:
            return (
                <div style={divStyle}>No status found</div>
            );
        }
        return (
            <div style={divStyle}>{this.text == '-' ? "0.00" : this.text}</div>
        );
    }

    getStatusColor() {
        switch(this.props.status) {
            case Status.HoldingInspection:
            return '#F6BB42';
            case Status.HoldingSolve:
            return '#48CFAD';
            case Status.Inspecting:
            return '#FC6E51';
            case Status.Solving:
            return '#4FC1E9';
            case Status.Stopped:
            return '#434A54';
            default:
            return '#ED5565';
        }
    }
    
}

export default ChronoElement;