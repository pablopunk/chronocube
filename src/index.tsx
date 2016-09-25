import * as React from "react";
import * as ReactDOM from "react-dom";

import './css/index.css';

import { Chrono } from "./View/Chrono";
import { Test } from "./View/Test";

var chrono = <Chrono/>;

ReactDOM.render(
    chrono,
    document.getElementById('timer')
);

ReactDOM.render(
    <Test/>,
    document.getElementById('test')
)