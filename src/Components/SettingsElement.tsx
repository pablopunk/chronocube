import * as React from "react";

export interface SettingsProps {inspection :boolean; hideTime :boolean; theme :string;}

export class SettingsElement extends React.Component<SettingsProps,{}> {

    render() {
        return (<div>Settings</div>);
    }
}

export default SettingsElement;