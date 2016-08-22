
class ChronoHelper {

    model :Model;

    constructor(model :Model) {
        this.model = model;
        this.model.chrono.helper = this;
    }

    start() {
        this.model.chrono.start();
    }

    show(time :string) {
        document.getElementById('timer').innerText = time;
    }
}