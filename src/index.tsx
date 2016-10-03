import * as React from "react";
import * as ReactDOM from "react-dom";

import './css/index.css';

import { Chrono } from "./Components/Chrono";
import { Sessions } from "./Components/Sessions";

var chrono = <Chrono/>;
var sessions = <Sessions/>;

init();

function init() {
    ReactDOM.render(
        chrono,
        document.getElementById('timer')
    );

    ReactDOM.render(
        sessions,
        document.getElementById('sessions')
    );
}