
class Settings {
    inspection :boolean;
    hideTime :boolean;
    theme :string;

    constructor(inspection = false, hideTime = false, theme = 'bright') { /* Defaults */
        this.inspection = inspection;
        this.hideTime = hideTime;
        this.theme = theme;
    }
}