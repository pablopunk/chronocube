import * as React from "react";
import {ViewController} from "../ViewController"

export interface ScrambleProps { text :string , view :ViewController}

export class ScrambleElement extends React.Component<ScrambleProps,{}> {

    render() {
        return (
            <p onClick={e => this.props.view.renderScramble()}>{this.props.text}</p>
        );
    }
}

export default ScrambleElement;