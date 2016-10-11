import * as React from "react";

export interface SolveProps { min :number, sec :number, dec :number, scramble :string, style? :__React.HTMLAttributes }

export class SolveElement extends React.Component<SolveProps,{}> {

    render() {
        let str :string = "";
        if (this.props.min > 0) str += this.props.min + ':';
        str += this.props.sec+'.'+(this.props.dec.toString().slice(0,2));

        return (
            <div className="solve" style={this.props.style}>{str}</div>
        );
    }
}

export default SolveElement;