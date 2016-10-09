import * as React from "react";

export class Settings extends React.Component<{},{}> {
    inspection :boolean;
    hideTime :boolean;
    theme :string;

    constructor() { /* Defaults */
        super();
        this.inspection = false;
        this.hideTime = false;
        this.theme = 'bright';
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
}

export default Settings;