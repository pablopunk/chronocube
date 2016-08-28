
enum KeyType {
    SPACE = 32
}

class InputHelper {

    chronoHelper :ChronoHelper;
    // keysPressed : { [key: number] : boolean; };

    constructor(chronoHelper :ChronoHelper) {
        this.chronoHelper = chronoHelper;
        this.bindEventsToBody();
    }

    bindEventsToBody() {
        document.body.addEventListener("keyup", e => this.cb_keyUp(e));
        document.body.addEventListener("keydown", e => this.cb_keyDown(e));
        // document.getElementById('toucharea').addEventListener('touchstart', this.keyDown);
        // document.addEventListener('touchstart', this.screenTouchDown);
        // document.getElementById('toucharea').addEventListener('touchend', this.keyUp);
        // document.addEventListener('touchend', this.screenTouchUp);
    }

    cb_keyUp(event :KeyboardEvent) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.chronoHelper.spaceEnd();
        }
    }
    
    cb_keyDown(event :KeyboardEvent) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.chronoHelper.spaceStart();
        }
    }
}