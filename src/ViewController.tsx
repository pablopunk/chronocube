import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChronoElement} from "./Components/ChronoElement";
import {Status} from "./Model/Chrono";
import {SessionsElement} from "./Components/SessionsElement";
import {SolvesElement} from "./Components/SolvesElement";
import {Session} from "./Model/Session";
import {Sessions} from "./Model/Sessions";
import {Solve} from "./Model/Solve";
import {Chrono} from "./Model/Chrono";

enum KeyType { SPACE = 32 }

export class ViewController {

    chrono :Chrono;
    sessionsManager :Sessions;

    constructor() {
        this.chrono = new Chrono(this);
        this.sessionsManager = new Sessions(this);
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
            <SessionsElement sessions={this.sessionsManager.sessions} view={this} currentSession={this.sessionsManager.currentSession} />,
            document.getElementById('sessions')
        )
        this.renderSolves();
    }

    renderSolves() {
        ReactDOM.render(
            <SolvesElement solves={this.sessionsManager.sessions[this.sessionsManager.currentSession].solves} />,
            document.getElementById('solves')
        )
    }

    addSessionAction() {
        var name = prompt("Enter new session name", "");
        this.sessionsManager.new(name.trim());
        this.sessionsManager.currentSession = this.sessionsManager.count()-1;
        this.renderSessions();
    }

    deleteSessionAction(index :number) {
        this.sessionsManager.remove(index); 
        this.renderSessions();
    }

    addSolveAction(solve :Solve) {
        let index = this.sessionsManager.currentSession;
        this.sessionsManager.sessions[index].new(solve);
        this.renderSessions();
    }

    setCurrentSession(index :number) {
        if (this.sessionsManager.count() <= index || index < 0) return;
        this.sessionsManager.currentSession = index;
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