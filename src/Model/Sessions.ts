
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
        if (name!=='' && !this.exists(name))
            this.sessions.push(new Session(name));
        this.view.renderSessions();
    }

    remove(index :number) {
        if (index > -1 && index < this.sessions.length) {
            this.sessions.splice(index, 1);
            if (this.sessions.length < 1) {
                this.new('Default');
            }
        }
    }

    index(name :string) {
        var index = -1;
        this.sessions.forEach(function(session, i) {
            if (session.name == name) { index = i; return; }
        });
        return index;
    }

    exists(name :string) {
        return (this.index(name) > -1);
    }

    count() {
        if (this.sessions == null) return 0;
        return this.sessions.length;
    }
}