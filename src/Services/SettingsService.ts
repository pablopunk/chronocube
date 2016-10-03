
export class SettingsService {
	settings :Settings;

	constructor() {
		this.settings = new Settings();
	}

	toggleInspection() {
        this.settings.inspection = !this.settings.inspection;
    }
    
    toggleHideTime() {
        this.settings.hideTime = !this.settings.hideTime;
    }

    toggleTheme() {
        if (this.settings.theme == 'bright') {
            this.settings.theme = 'dark';
        } else {
            this.settings.theme = 'bright';
        }
    }
}