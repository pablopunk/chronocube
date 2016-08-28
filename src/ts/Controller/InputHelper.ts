
class InputHelper {

    keysPressed : { [key: number] : boolean; };

    constructor() {
        this.bindEventsToBody();
        this.resetKeys();
    }

    bindEventsToBody() {
        document.body.addEventListener("keyup", this.keyUp);
        document.body.addEventListener("keydown", this.keyDown);
        // document.getElementById('toucharea').addEventListener('touchstart', this.keyDown);
        // document.addEventListener('touchstart', this.screenTouchDown);
        // document.getElementById('toucharea').addEventListener('touchend', this.keyUp);
        // document.addEventListener('touchend', this.screenTouchUp);
    }

    resetKeys() {
        this.keysPressed = {};
    }

    keyUp(event :KeyboardEvent) {
        var key = event.which;
        this.keysPressed[key] = false;
    }
    
    keyDown(event :KeyboardEvent) {
        var key = event.which;
        this.keysPressed[key] = true;
    }
}