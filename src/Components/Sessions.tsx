import * as React from "react";
import { Session } from "./Session";

export interface SessionsProps { sessions: Array<Session>; }

export class Sessions extends React.Component<SessionsProps,{}> {

    render() {
        var rows = this.props.sessions.map(function(session, i) {
            return (
                <Session key={i} name={session.props.name} solves={session.props.solves} />
            );
        });

        return (
            <div>sessions: {rows}</div>
        );
    }

    new(name :string) {
        if (!this.exists(name))
            this.props.sessions.push(new Session({name:name , solves:[]}));
    }

    remove(index :number) {
        if (index && index <= this.props.sessions.length)
            this.props.sessions.splice(index, 1);
    }

    exists(name :string) {
        for (var session of this.props.sessions)
            if (session.props.name == name) return true;
        return false;
    }
}

export default Sessions;