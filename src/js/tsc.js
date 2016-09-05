var ChronoState;
(function (ChronoState) {
    ChronoState[ChronoState["STOPPED"] = 0] = "STOPPED";
    ChronoState[ChronoState["HOLDING_INSPECTION"] = 1] = "HOLDING_INSPECTION";
    ChronoState[ChronoState["INSPECTING"] = 2] = "INSPECTING";
    ChronoState[ChronoState["HOLDING_SOLVE"] = 3] = "HOLDING_SOLVE";
    ChronoState[ChronoState["SOLVING"] = 4] = "SOLVING";
    ChronoState[ChronoState["SOLVED"] = 5] = "SOLVED";
})(ChronoState || (ChronoState = {}));
;
var ChronoType;
(function (ChronoType) {
    ChronoType[ChronoType["Timer"] = 1] = "Timer";
    ChronoType[ChronoType["Inspection"] = 2] = "Inspection";
})(ChronoType || (ChronoType = {}));
var Chrono = (function () {
    function Chrono(type) {
        if (type === void 0) { type = ChronoType.Timer; }
        this.type = type;
        this.state = ChronoState.STOPPED;
        this.dec = this.sec = this.min = 0;
    }
    Chrono.prototype.loop = function () {
        this.endTime = new Date();
        this.diff = this.endTime - this.startTime;
        this.diff = new Date(this.diff);
        this.dec = this.diff.getMilliseconds();
        this.sec = this.diff.getSeconds();
        this.min = this.diff.getMinutes();
        this.continue();
    };
    Chrono.prototype.start = function () {
        if (this.state == (ChronoState.STOPPED | ChronoState.HOLDING_SOLVE)) {
            this.state = ChronoState.SOLVING;
            this.startTime = new Date();
            this.loop();
        }
    };
    Chrono.prototype.stop = function () {
        if (this.state == ChronoState.SOLVING) {
            this.state = ChronoState.STOPPED;
            clearTimeout(this.timerId);
        }
    };
    Chrono.prototype.reset = function () {
        this.startTime = new Date();
    };
    Chrono.prototype.continue = function () {
        var _this = this;
        if (this.type == ChronoType.Inspection && this.sec > 14) {
            clearTimeout(this.timerId);
        }
        else {
            this.timerId = setTimeout(function () { return _this.loop(); }, 100);
        }
        this.helper.show();
    };
    Chrono.prototype.dump = function () {
        console.log('#Chrono');
        console.log('@Type: ' + this.type);
    };
    return Chrono;
}());
var Session = (function () {
    function Session(name) {
        if (name === void 0) { name = 'Default'; }
        this.name = name;
        this.solves = new Array();
    }
    Session.prototype.addSolve = function (newSolve) {
        this.solves.push(newSolve);
    };
    Session.prototype.deleteSolve = function (index) {
        if (this.getNumberOfSolves() <= index) {
            this.solves.splice(index);
        }
    };
    Session.prototype.getNumberOfSolves = function () {
        if (this.solves == null)
            return 0;
        else
            return this.solves.length;
    };
    Session.prototype.dump = function () {
        console.log('#Session');
        console.log('@Name: ' + this.name + ' @Solves: ' + this.solves);
    };
    return Session;
}());
var Solve = (function () {
    function Solve() {
    }
    Solve.prototype.setTime = function (time) {
        var re = /^([0-9]{2}):([0-5])([0-9])\.([0-9]{2})$/;
        if (!time.match(re)) {
            console.log('String ' + time + ' doesn\'t seem like a correct time');
            return;
        }
        this.min = parseInt(time.substr(0, 2));
        this.sec = parseInt(time.substr(3, 5));
        this.dec = parseInt(time.substr(6, 8));
    };
    Solve.prototype.getTime = function () {
        var str = this.min + ':' + this.sec + '.' + this.dec;
        return str;
    };
    Solve.prototype.dump = function () {
        console.log('#Solve');
        console.log('@Time: ' + this.getTime() + ' @Scramble: ' + this.scramble);
    };
    return Solve;
}());
var Settings = (function () {
    function Settings(inspection, hideTime, theme) {
        if (inspection === void 0) { inspection = false; }
        if (hideTime === void 0) { hideTime = false; }
        if (theme === void 0) { theme = 'bright'; }
        this.inspection = inspection;
        this.hideTime = hideTime;
        this.theme = theme;
    }
    Settings.prototype.toggleInspection = function () {
        this.inspection = !this.inspection;
    };
    Settings.prototype.toggleHideTime = function () {
        this.hideTime = !this.hideTime;
    };
    Settings.prototype.toggleTheme = function () {
        if (this.theme == 'bright') {
            this.theme = 'dark';
        }
        else {
            this.theme = 'bright';
        }
    };
    Settings.prototype.dump = function () {
        console.log('#Settings');
        console.log('@Inspection: ' + this.inspection + ' @HideTime: ' + this.hideTime + ' @Theme: ' + this.theme);
    };
    return Settings;
}());
var Model = (function () {
    function Model() {
        this.settings = new Settings();
        this.sessions = new Array();
        this.sessions.push(new Session());
        this.chrono = new Chrono();
    }
    Model.prototype.dump = function () {
        this.chrono.dump();
        this.sessions.forEach(function (element) {
            element.dump();
        });
        this.settings.dump();
    };
    return Model;
}());
var Controller = (function () {
    function Controller() {
        this.model = new Model();
        this.view = new ViewController();
        this.chronoHelper = new ChronoHelper(this.model, this.view);
        this.inputHelper = new InputHelper(this.chronoHelper);
    }
    Controller.prototype.dump = function () {
        this.model.dump();
    };
    return Controller;
}());
var ChronoHelper = (function () {
    function ChronoHelper(model, view) {
        this.model = model;
        this.view = view;
        this.model.chrono.helper = this;
        this.regExp = new RegExp('([0-9]+):([0-5]*[0-9]+)\.([0-9]+)');
    }
    ChronoHelper.prototype.start = function () {
        document.getElementById('timer').style.color = 'black';
        this.model.chrono.start();
    };
    ChronoHelper.prototype.stop = function () {
        this.model.chrono.stop();
        this.show();
    };
    ChronoHelper.prototype.show = function () {
        if (this.getState() == ChronoState.SOLVING) {
            this.showSolving();
        }
        else {
            this.showStopped();
        }
    };
    ChronoHelper.prototype.showSolving = function () {
        var html = '';
        if (this.min() > 0)
            html += this.min().toString();
        html += this.sec().toString();
        this.view.showTime(html);
    };
    ChronoHelper.prototype.showStopped = function () {
        var html = '';
        if (this.min() > 0)
            html += this.min().toString();
        this.sec() > 10 ? html += this.sec().toString() : html += ('0' + this.sec().toString());
        html += ('.' + this.dec().toString());
        this.view.showTime(html);
    };
    ChronoHelper.prototype.getTimeString = function () {
        var min = (this.min() > 10) ? this.min() : '0' + this.min();
        var sec = (this.sec() > 10) ? this.sec() : '0' + this.sec();
        var dec = this.dec();
        return min + ':' + sec + '.' + dec;
    };
    ChronoHelper.prototype.getState = function () {
        return this.model.chrono.state;
    };
    ChronoHelper.prototype.setState = function (state) {
        this.model.chrono.state = state;
    };
    ChronoHelper.prototype.min = function () {
        return this.model.chrono.min;
    };
    ChronoHelper.prototype.sec = function () {
        return this.model.chrono.sec;
    };
    ChronoHelper.prototype.dec = function () {
        var str = this.model.chrono.dec.toString();
        var int = str[0] + str[1];
        return parseInt(int);
    };
    ChronoHelper.prototype.spaceStart = function () {
        if (this.getState() == ChronoState.SOLVING) {
            this.stop();
        }
        else if (this.getState() == ChronoState.STOPPED) {
            this.setState(ChronoState.HOLDING_SOLVE);
            document.getElementById('timer').style.color = 'lawngreen';
        }
    };
    ChronoHelper.prototype.spaceEnd = function () {
        if (this.getState() == (ChronoState.STOPPED | ChronoState.HOLDING_SOLVE)) {
            this.start();
        }
    };
    return ChronoHelper;
}());
var KeyType;
(function (KeyType) {
    KeyType[KeyType["SPACE"] = 32] = "SPACE";
})(KeyType || (KeyType = {}));
var InputHelper = (function () {
    function InputHelper(chronoHelper) {
        this.chronoHelper = chronoHelper;
        this.bindEventsToBody();
    }
    InputHelper.prototype.bindEventsToBody = function () {
        var _this = this;
        document.body.addEventListener("keyup", function (e) { return _this.cb_keyUp(e); });
        document.body.addEventListener("keydown", function (e) { return _this.cb_keyDown(e); });
    };
    InputHelper.prototype.cb_keyUp = function (event) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.chronoHelper.spaceEnd();
        }
    };
    InputHelper.prototype.cb_keyDown = function (event) {
        var key = event.which;
        if (key == KeyType.SPACE) {
            this.chronoHelper.spaceStart();
        }
    };
    return InputHelper;
}());
var ViewController = (function () {
    function ViewController() {
        this.timerDivId = 'timer';
    }
    ViewController.prototype.showTime = function (time) {
        document.getElementById(this.timerDivId).innerText = time;
    };
    return ViewController;
}());
//# sourceMappingURL=tsc.js.map