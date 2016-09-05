
class Controller implements Dump {

    model :Model;
    chronoHelper :ChronoHelper;
    inputHelper :InputHelper;
    view :ViewController;

    constructor() {
        this.model = new Model();
        this.view = new ViewController();
        this.chronoHelper = new ChronoHelper(this.model, this.view);
        this.inputHelper = new InputHelper(this.chronoHelper);
    }

    dump() {
        this.model.dump();
    }
}