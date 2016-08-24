
class Controller implements Dump {

    model :Model;
    chronoHelper :ChronoHelper;

    constructor() {
        this.model = new Model();
        this.chronoHelper = new ChronoHelper(this.model);
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