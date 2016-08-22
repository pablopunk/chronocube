
class Model implements Dump {
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

    dump() {
        this.chrono.dump();
        this.sessions.forEach(element => {
            element.dump();
        });
        this.settings.dump();
    }
}