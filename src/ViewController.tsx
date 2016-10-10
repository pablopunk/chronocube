import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChronoElement} from "./Components/ChronoElement";
import {Status} from "./Model/Chrono";
import {SessionsElement} from "./Components/SessionsElement";
import {Session} from "./Model/Session";
import {Sessions} from "./Model/Sessions";
import {Solve} from "./Model/Solve";
import {Chrono} from "./Model/Chrono";

enum KeyType { SPACE = 32 }

export class ViewController {

    chrono :Chrono;
    sessions :Sessions;

    constructor() {
        this.chrono = new Chrono(this);
        this.sessions = new Sessions(this);
        this.bindEventsToBody();
    }

    renderChrono() {
        ReactDOM.render(
            <ChronoElement inspection={this.chrono.inspection} status={this.chrono.status} min={this.chrono.min} dec={this.chrono.dec} sec={this.chrono.sec}/>,
            document.getElementById('timer')
        )
    }

    renderSessions() {
        ReactDOM.render(
            <SessionsElement sessions={this.sessions.sessions} view={this} currentSession={this.sessions.currentSession} />,
            document.getElementById('sessions')
        )
    }

    addSessionAction() {
        var name = prompt("Enter new session name", "");
        this.sessions.new(name);
        this.sessions.currentSession = this.sessions.count()-1;
        this.renderSessions();
    }

    addSolveAction(solve :Solve) {
        let index = this.sessions.currentSession;
        this.sessions.sessions[index].new(solve);
        this.renderSessions();
    }

    setCurrentSession(index :number) {
        if (this.sessions.count() <= index) return;
        this.sessions.currentSession = index;
        this.renderSessions();
    }

    bindEventsToBody() {
        document.body.addEventListener("keyup", e => this.cb_keyUp(e.which));
        document.body.addEventListener("keydown", e => this.cb_keyDown(e.which));
        document.getElementById('toucharea').addEventListener("touchstart", e => this.cb_keyDown(KeyType.SPACE));
        document.getElementById('toucharea').addEventListener("touchend", e => this.cb_keyUp(KeyType.SPACE));
    }

    cb_keyUp(key :number) {
        if (key == KeyType.SPACE)
            if (this.chrono.spacePressed) // If I'm already holding space
                this.chrono.spaceEnd();
    }
    
    cb_keyDown(key :number) {
        if (key == KeyType.SPACE)
            if (!this.chrono.spacePressed) // If I'm not holding space already
                this.chrono.spaceStart();
    }
}