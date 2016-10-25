import * as React from "react";
import {Solve} from "../Model/Solve";

export interface SolveProps { solve :Solve, scramble :string, style? :__React.HTMLAttributes }

export class SolveElement extends React.Component<SolveProps,{}> {

    render() {
        let str :string = "";
        if (this.props.solve.min > 0) str += this.props.solve.min + ':';
        str += this.props.solve.sec+'.'+this.props.solve.dec;

        return (
            <div className="solve" style={this.props.style} title={this.props.solve.scramble}>{str}</div>
        );
    }
}

export default SolveElement;