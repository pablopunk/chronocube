import * as React from "react"
import {SettingsManager} from "../Model/Settings"
import {ViewController}  from "../ViewController"

export interface SettingsProps {manager :SettingsManager, view :ViewController}

export class SettingsElement extends React.Component<SettingsProps,{}> {

    render() {
        var settings = this.props.manager.settings
        var view     = this.props.view
        var rows = []

        Object.keys(settings).map(function(setting, index){
            var value = settings[setting];
            var icon  = value ? "ion-android-checkbox" : "ion-android-checkbox-outline-blank"

            rows.push(
                <div key={index} className="setting" onClick={e => view.toggleSettingAction(setting)}>
                    {setting}
                    <i className={icon}></i>
                </div>
            )
        })

        return (
            <div>
                <div className="title"><i className="ion-ios-gear"></i>Settings</div>
                {rows}
            </div>
        )
    }
}

export default SettingsElement;