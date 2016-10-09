import * as React from "react";
import {Status} from "../Model/Chrono";

export interface ChronoProps {
    inspection :Boolean,
    status: Status,
    dec :number,
    sec :number,
    min :number
}

export class ChronoElement extends React.Component<ChronoProps,{}>  {

    text :string

    render() {
        var divStyle = {
            color: this.getStatusColor(),
            width: '100%',
            textAlign: 'center',
            fontSize: '10em',
            fontFamily: 'Digital, Monospace'
        };
        var min = (this.props.min > 0) ? this.props.min.toString() + ':' : ''; // don't show 0 minutes
        var dec = this.props.dec.toString().slice(0,2); // truncate decimals
        switch(this.props.status) {
            case Status.HoldingInspection:
            case Status.HoldingSolve:
            case Status.Inspecting:
            case Status.Solving:
            this.text = min+this.props.sec;
            break;

            case Status.Stopped:
            this.text = min+this.props.sec+'.'+dec;
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

    getStatusColor() {
        switch(this.props.status) {
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

export default ChronoElement;