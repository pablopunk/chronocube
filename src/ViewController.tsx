import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChronoElement} from "./Components/ChronoElement";
import {Status} from "./Model/Chrono";
import {SessionsElement} from "./Components/SessionsElement";
import {StatsElement} from "./Components/StatsElement";
import {ScrambleElement} from "./Components/ScrambleElement";
import {SettingsElement} from "./Components/SettingsElement";
import {SettingsManager} from "./Model/Settings";
import {Session} from "./Model/Session";
import {SessionsManager} from "./Model/Sessions";
import {Solve} from "./Model/Solve";
import {Chrono} from "./Model/Chrono";
import {Cube} from "./Model/Cube";
import {Storage} from "./Model/Storage";

enum KeyType { SPACE = 32 }

export class ViewController {

    chrono :Chrono
    sessionsManager :SessionsManager
    settingsManager :SettingsManager
    cube :Cube
    storage :Storage

    constructor()
    {
        this.settingsManager = new SettingsManager()
        this.chrono          = new Chrono(this, this.settingsManager)
        this.sessionsManager = new SessionsManager(this)
        this.cube            = new Cube()
        this.storage         = new Storage(this.sessionsManager, this.settingsManager)
        this.bindEventsToBody()
        this.loadFromStorage()
    }

    /****** Render functions *******/
    renderChrono()
    {
        ReactDOM.render(
            <ChronoElement settingsManager={this.settingsManager} status={this.chrono.status} solve={new Solve(this.chrono.min, this.chrono.sec, this.chrono.dec)}/>,
            document.getElementById('timer')
        )
    }

    renderSessions()
    {
        ReactDOM.render(
            <SessionsElement sessions={this.sessionsManager.sessions} view={this} current={this.sessionsManager.current} />,
            document.getElementById('sessions')
        )
        this.renderStats();
        this.renderScramble();
        this.saveToStorage()
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
            <StatsElement session={this.sessionsManager.sessions[this.sessionsManager.current]} view={this}/>,
            document.getElementById('stats')
        )
    }

    renderSettings()
    {
        ReactDOM.render(
            <SettingsElement manager={this.settingsManager} view={this}/>,
            document.getElementById('settings')
        )
        this.saveToStorage()
    }

    /****** Action functions *******/

    addSessionAction()
    {
        var name = prompt("Enter new session name", "");
        this.sessionsManager.new(name.trim());
        this.sessionsManager.current = this.sessionsManager.count()-1;
        this.renderSessions();
    }

    toggleSettingAction(setting) {
        this.settingsManager.toggle(setting)
        this.renderSettings()
    }

    deleteSessionAction(index :number)
    {
        this.sessionsManager.remove(index); 
        this.renderSessions();
    }

    addSolveAction(solve :Solve)
    {
        let index = this.sessionsManager.current;
        this.sessionsManager.sessions[index].new(solve);
        this.renderSessions();
    }

    setCurrentSession(index :number)
    {
        if (this.sessionsManager.count() <= index || index < 0) return;
        this.sessionsManager.current = index;
        this.renderSessions();
    }

    getCurrentScramble()
    {
        return document.getElementById('scramble').innerText;
    }

    /****** Config functions *******/

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

    saveToStorage()
    {
        this.storage.save()
    }

    loadFromStorage()
    {
        var storage = this.storage.load()
        if (storage.sessions != null) {
            this.sessionsManager.sessions = [] // prevent adding multiple 'Default' sessions
            this.sessionsManager.setProps(storage.sessions)
        }
        if (storage.settings != null) {
            this.settingsManager.setProps(storage.settings)
        }
    }
}