
import { Chrono } from "../View/Chrono";

class Model {
    chrono :Chrono;
    sessions :Array<Session>;
    settings :Settings;

    constructor() {
        //@TODO: load from localstorage
        this.settings = new Settings(); /* defaults */
        this.sessions = new Array();
        this.sessions.push(new Session());
        this.chrono = new Chrono();
    }
}