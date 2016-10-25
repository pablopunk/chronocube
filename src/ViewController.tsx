import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChronoElement} from "./Components/ChronoElement";
import {Status} from "./Model/Chrono";
import {SessionsElement} from "./Components/SessionsElement";
import {StatsElement} from "./Components/StatsElement";
import {ScrambleElement} from "./Components/ScrambleElement";
import {Session} from "./Model/Session";
import {Sessions} from "./Model/Sessions";
import {Solve} from "./Model/Solve";
import {Chrono} from "./Model/Chrono";
import {Cube} from "./Model/Cube";

enum KeyType { SPACE = 32 }

export class ViewController {

    chrono :Chrono;
    sessionsManager :Sessions;
    cube :Cube;

    constructor()
    {
        this.chrono = new Chrono(this);
        this.sessionsManager = new Sessions(this);
        this.cube = new Cube();
        this.bindEventsToBody();
    }

    renderChrono()
    {
        ReactDOM.render(
            <ChronoElement inspection={this.chrono.inspection} status={this.chrono.status} solve={new Solve(this.chrono.min, this.chrono.sec, this.chrono.dec)}/>,
            document.getElementById('timer')
        )
    }

    renderSessions()
    {
        ReactDOM.render(
            <SessionsElement sessions={this.sessionsManager.sessions} view={this} currentSession={this.sessionsManager.currentSession} />,
            document.getElementById('sessions')
        )
        this.renderStats();
        this.renderScramble();
    }

    renderScramble()
    {
        ReactDOM.render(
            <ScrambleElement text={this.cube.getScramble()} view={this}/>,
            document.getElementById('scramble')
        )
    }

    renderStats()
    {
        ReactDOM.render(
            <StatsElement session={this.sessionsManager.sessions[this.sessionsManager.currentSession]} view={this}/>,
            document.getElementById('stats')
        )
    }

    addSessionAction()
    {
        var name = prompt("Enter new session name", "");
        this.sessionsManager.new(name.trim());
        this.sessionsManager.currentSession = this.sessionsManager.count()-1;
        this.renderSessions();
    }

    deleteSessionAction(index :number)
    {
        this.sessionsManager.remove(index); 
        this.renderSessions();
    }

    addSolveAction(solve :Solve)
    {
        let index = this.sessionsManager.currentSession;
        this.sessionsManager.sessions[index].new(solve);
        this.renderSessions();
    }

    setCurrentSession(index :number)
    {
        if (this.sessionsManager.count() <= index || index < 0) return;
        this.sessionsManager.currentSession = index;
        this.renderSessions();
    }

    getCurrentScramble()
    {
        return document.getElementById('scramble').innerText;
    }

    bindEventsToBody()
    {
        document.body.addEventListener("keyup", e => this.cb_keyUp(e.which));
        document.body.addEventListener("keydown", e => this.cb_keyDown(e.which));
        document.getElementById('toucharea').addEventListener("touchstart", e => this.cb_keyDown(KeyType.SPACE));
        document.getElementById('toucharea').addEventListener("touchend", e => this.cb_keyUp(KeyType.SPACE));
    }

    cb_keyUp(key :number)
    {
        if (key == KeyType.SPACE)
            if (this.chrono.spacePressed) // If I'm already holding space
                this.chrono.spaceEnd();
    }
    
    cb_keyDown(key :number)
    {
        if (key == KeyType.SPACE)
            if (!this.chrono.spacePressed) // If I'm not holding space already
                this.chrono.spaceStart();
    }
}