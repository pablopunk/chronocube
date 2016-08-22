
class Settings implements Dump {
    inspection :boolean;
    hideTime :boolean;
    theme :string;

    constructor(inspection = false, hideTime = false, theme = 'bright') { /* Defaults */
        this.inspection = inspection;
        this.hideTime = hideTime;
        this.theme = theme;
    }

    toggleInspection() {
        this.inspection = !this.inspection;
    }
    
    toggleHideTime() {
        this.hideTime = !this.hideTime;
    }

    toggleTheme() {
        if (this.theme == 'bright') {
            this.theme = 'dark';
        } else {
            this.theme = 'bright';
        }
    }

    dump() {
        console.log('#Settings');
        console.log('@Inspection: ' + this.inspection + ' @HideTime: ' + this.hideTime  + ' @Theme: ' + this.theme);
    }
}