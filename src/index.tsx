import * as React from "react"
import * as ReactDOM from "react-dom"

import './css/index.css'

import { ViewController } from "./ViewController"

let view = new ViewController()
 
view.renderChrono()
view.renderSessions()
view.renderSettings()