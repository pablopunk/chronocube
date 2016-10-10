import * as React from "react";
import { SessionElement } from "./SessionElement";
import { Session } from "../Model/Session";
import {ViewController} from "../ViewController"

export interface SessionsProps { sessions: Array<Session>, view :ViewController, currentSession :number}

export class SessionsElement extends React.Component<SessionsProps,{}> {

    render() {
        var currentSession = this.props.currentSession;
        var view = this.props.view;
        var rows = this.props.sessions.map(function(session, i) {
            return (
                <SessionElement key={i} index={i} name={session.name} solves={session.solves} active={(i == currentSession)} view={view}/>
            );
        });

        return (
            <div>
                <h3 style={{textAlign:"center"}}>Sessions</h3>
                {rows}
                <a href="#" id="add-session-button" className="btn btn-block btn-info" onClick={e => this.props.view.addSessionAction()}><i className="ion-plus"></i> Add session</a>
            </div>
        );
    }
}

export default SessionsElement;