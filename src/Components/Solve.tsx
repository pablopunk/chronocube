import * as React from "react";

export interface SolveProps { min :number, sec :number, dec :number, scramble :string; }

export class Solve extends React.Component<SolveProps,{}> {

    render() {
        return (
            <div>{this.getTime()}</div>
        );
    }

    setTime(time :string)
    {
        let re :RegExp = /^([0-9]{2}):([0-5])([0-9])\.([0-9]{2})$/;
        if (! time.match(re) ) {
            console.log('String '+ time +' doesn\'t seem like a correct time');
            return;
        }
        this.props.min = parseInt(time.substr(0,2));
        this.props.sec = parseInt(time.substr(3,5));
        this.props.dec = parseInt(time.substr(6,8));
    }

    getTime()
    {
        let str :string = "";
        if (this.props.min > 0) str += this.props.min + ':';
        str += this.props.sec+'.'+this.props.dec;
        return str;
    }
}