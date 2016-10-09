import * as React from "react";
import * as ReactDOM from "react-dom";

import './css/index.css';

import { Chrono }   from "./Components/Chrono";
import { Status }   from "./Components/Chrono";
import { Sessions } from "./Components/Sessions";
import { Session }  from "./Components/Session";
import { Solve }  from "./Components/Solve";

var chrono = <Chrono regExp={new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)')} classNames="container"/>; 
var defaultSession = new Session({name:"Default", solves:[]});
var sessions = <Sessions sessions={[ defaultSession ]} />;

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