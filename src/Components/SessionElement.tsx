import * as React from "react";
import { Solve } from '../Model/Solve';
import { SolveElement } from './SolveElement';
import {ViewController} from "../ViewController"

export interface SessionProps { name: string, index: number, solves: Array<Solve>, active: boolean, view :ViewController}

export class SessionElement extends React.Component<SessionProps,{}> {

    view :ViewController;

    render() {
        var rows = this.props.solves.map(function(solve, i) {
            return (
                <SolveElement key={i} dec={solve.dec} sec={solve.sec} min={solve.min} scramble={solve.scramble}/>
            );
        });

        var titleStyle = { textAlign:"right", backgroundColor:"inherit", cursor:"pointer", margin:0 }
        if (this.props.active) titleStyle.backgroundColor = "#222";

        return (
            <div>
                <h5 style={titleStyle} onClick={e => this.props.view.setCurrentSession(this.props.index)}> {this.props.name} </h5>
                <div>{rows}</div>
            </div>
        );
    }
}