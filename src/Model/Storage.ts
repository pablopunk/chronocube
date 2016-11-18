
import {SessionsManager} from './Sessions'
import {SettingsManager} from './Settings'

export class Storable {
    getProps()
    {
        return {}
    }

    // this method must be override for complex props
    // right now it just handles variables
    setProps(props :Object)
    {
        var self = this
        Object.keys(props).forEach(function(key, index) {
            self[key] = props[key]
        })
    }
}

export class Storage {

    sessions: SessionsManager
    settings: SettingsManager

    constructor(sessions :SessionsManager, settings: SettingsManager)
    {
        this.sessions = sessions;
        this.settings = settings;
    }

    save()
    {
        localStorage.setItem('sessions', JSON.stringify(this.sessions.getProps()))
        localStorage.setItem('settings', JSON.stringify(this.settings.getProps()))
    }

    load()
    {
        return {
            'sessions' : JSON.parse(localStorage.getItem('sessions')),
            'settings' : JSON.parse(localStorage.getItem('settings'))
        }
    }
}