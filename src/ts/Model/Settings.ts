
class Settings {
    inspection :boolean;
    hideTime :boolean;
    theme :string;
    
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
}