import * as React from "react";
import { SessionElement } from "./SessionElement";
import { Session } from "../Model/Session";
import {ViewController} from "../ViewController"

export interface SessionsProps { sessions: Array<Session>, view :ViewController}

export class SessionsElement extends React.Component<SessionsProps,{}> {

    render() {
        var rows = this.props.sessions.map(function(session, i) {
            return (
                <SessionElement key={i} name={session.name} solves={session.solves} />
            );
        });

        return (
            <div>
                <h3 style={{textAlign:"center"}}>Sessions</h3>
                {rows}
            </div>
        );
    }
}

export default SessionsElement;