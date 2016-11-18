
import {Storable} from './Storage'

export class SettingsManager extends Storable {

    settings = {
        "Inspection"   : false,
        "Hide Timer"   : false,
        "Change theme" : false
    }

    toggle(setting) {
        this.settings[setting] = !this.settings[setting] 
    }

    getProps()
    {
        return {
            'settings' : this.settings
        }
    }
}