
export class SettingsManager {

    settings = {
        "Inspection"   : false,
        "Hide Timer"   : false,
        "Change theme" : false
    }

    toggle(setting) {
        this.settings[setting] = !this.settings[setting] 
    }
}