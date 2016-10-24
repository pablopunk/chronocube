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
                <SolveElement key={i} solve={solve} scramble={solve.scramble}/>
            );
        });

        var titleClass = "session-name ";
        if (this.props.active) titleClass += "active ";
        else rows = []; // hide non-active sessions

        return (
            <div>
                <h5 className={titleClass} onClick={e => this.props.view.setCurrentSession(this.props.index)}>
                    <i className="ion-trash-a delete-session" onClick={e => this.props.view.deleteSessionAction(this.props.index)}></i>
                    {this.props.name}
                </h5>
                <div>{rows}</div>
            </div>
        );
    }
}