import * as React from "react";
import { Session } from "../Model/Session";

export class Sessions extends React.Component<{},{}> {
    sessions :Array<Session>;

    constructor(sessions = new Array()) {
        super();
        this.sessions = sessions;
        if (!sessions.length) this.sessions = [new Session()];
    }

    render() { 
        var rows :any = [];
        console.log(this.sessions);
        this.sessions.forEach(function(session, index) {
            rows.push(session.name);
        });
        
        return (
            <div>sessions: {rows}</div>
        );
    }

    new(name :string) {
        if (!this.exists(name))
            this.sessions.push(new Session(name));
    }

    remove(index :number) {
        if (index && index <= this.sessions.length)
            this.sessions.splice(index, 1);
    }

    exists(name :string) {
        for (var session of this.sessions)
            if (session.name == name) return true;
        return false;
    }
}

export default Sessions;