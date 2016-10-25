import * as React from "react";
import { Session } from "../Model/Session";
import {ViewController} from "../ViewController"

export interface StatsProps { session :Session, view :ViewController }

export class StatsElement extends React.Component<StatsProps,{}> {

    render() {

        let ao5 = this.props.session.average(5)
        let ao12 = this.props.session.average(12)
        let aoAll = this.props.session.averageAll()
        let pb = this.props.session.best()

        return (
            <table>
                <tbody>
                    <tr><td>ao5</td><td>{ao5.getTimeShort()}</td></tr>
                    <tr><td>ao12</td><td>{ao12.getTimeShort()}</td></tr>
                    <tr><td>aoAll</td><td>{aoAll.getTimeShort()}</td></tr>
                    <tr><td>PB single</td><td>{pb.getTimeShort()}</td></tr>
                </tbody>
            </table>
        );
    }
}

export default StatsElement;