
class Controller implements Dump {

    model :Model;
    chronoHelper :ChronoHelper;
    inputHelper :InputHelper;

    constructor() {
        this.model = new Model();
        this.chronoHelper = new ChronoHelper(this.model);
        this.inputHelper = new InputHelper();
    }

    startChrono() {
        this.chronoHelper.start();
    }

    stopChrono() {
        this.chronoHelper.stop();
    }

    dump() {
        this.model.dump();
    }
}