
import { Session } from './Session';
import {ViewController} from "../ViewController"
import {Storable} from './Storage'

export class SessionsManager extends Storable {
    view :ViewController;
    sessions :Array<Session>;
    current :number;

    constructor(view :ViewController, sessions = [ new Session('Default') ], current = 0)
    {
        super()
        this.sessions = sessions;
        this.view = view;
        this.current = current;
    }

    getProps()
    {
        var sessions = this.sessions.map(function(session, index) {
            return session.getProps()
        })
        return {
            'sessions' : sessions,
            'current'  : this.current
        }
    }

    setProps(props :Object) // this method must be override for complex props
    {
        var self = this
        Object.keys(props).forEach(function(key, index) {
            if (key == 'sessions') {
                var sessions :Session[] = props[key]
                sessions.forEach(function(sessionProps, i) {
                    var session = new Session()
                    session.setProps(sessionProps)
                    self.sessions.push(session)
                })
            } else {
                self[key] = props[key]
            }
        })
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