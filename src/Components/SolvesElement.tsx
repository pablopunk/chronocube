import * as React from "react";
import { Solve } from '../Model/Solve';
import { SolveElement } from './SolveElement';
import {ViewController} from "../ViewController"

export interface SolvesProps { solves: Array<Solve> }

export class SolvesElement extends React.Component<SolvesProps,{}> {

    render() {
        let maxSolves = 6;
        var rows = this.props.solves.reverse().map(function(solve, i) {
            if (i > maxSolves) return;
            let n = (maxSolves - i);
            let opacity = 100 - n;
            let font :string = n + "em" ;
            return (
                <SolveElement style={{ fontSize:font, marginTop:"-0.5em", opacity:opacity }} key={i} dec={solve.dec} sec={solve.sec} min={solve.min} scramble={solve.scramble}/>
            );
        });

        return (
            <div>{rows}</div>
        );
    }
}