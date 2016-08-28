
class Controller implements Dump {

    model :Model;
    chronoHelper :ChronoHelper;
    inputHelper :InputHelper;

    constructor() {
        this.model = new Model();
        this.chronoHelper = new ChronoHelper(this.model);
        this.inputHelper = new InputHelper(this.chronoHelper);
    }

    dump() {
        this.model.dump();
    }
}