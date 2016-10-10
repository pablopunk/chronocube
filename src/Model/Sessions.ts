
import { Session } from './Session';
import {ViewController} from "../ViewController"

export class Sessions {
    view :ViewController;
    sessions :Array<Session>;
    currentSession :number;

    constructor(view :ViewController, sessions = [ new Session('Default') ], currentSession = 0)
    {
        this.sessions = sessions;
        this.view = view;
        this.currentSession = currentSession;
    }

    new(name :string) {
        if (!this.exists(name))
            this.sessions.push(new Session(name));
        this.view.renderSessions();
    }

    remove(index :number) {
        if (index && index <= this.sessions.length)
            this.sessions.splice(index, 1);
    }

    index(name :string) {
        var index = -1;
        this.sessions.forEach(function(session, i) {
            if (session.name == name) { index = i; return; }
        });
        if (index) return index;
        return -1;
    }

    exists(name :string) {
        return (this.index(name) > -1);
    }

    count() {
        if (this.sessions == null) return 0;
        return this.sessions.length;
    }
}