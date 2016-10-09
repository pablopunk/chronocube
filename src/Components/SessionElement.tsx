import * as React from "react";
import { Solve } from '../Model/Solve';
import { SolveElement } from './SolveElement';

export interface SessionProps { name: string; solves: Array<Solve>; }

export class SessionElement extends React.Component<SessionProps,{}> {

    render() {
        var rows = this.props.solves.map(function(solve, i) {
            return (
                <SolveElement key={i} dec={solve.dec} sec={solve.sec} min={solve.min} scramble={solve.scramble}/>
            );
        });

        return (
            <div>
                <h5 style={{textAlign:"right"}}> {this.props.name} </h5>
                <div>{rows}</div>
            </div>
        );
    }
}