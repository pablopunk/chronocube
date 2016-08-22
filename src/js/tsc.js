var ChronoType;
(function (ChronoType) {
    ChronoType[ChronoType["Timer"] = 1] = "Timer";
    ChronoType[ChronoType["Inspection"] = 2] = "Inspection";
})(ChronoType || (ChronoType = {}));
var Chrono = (function () {
    function Chrono(type) {
        if (type === void 0) { type = ChronoType.Timer; }
        this.type = type;
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
        this.startTime = new Date();
        this.loop();
    };
    Chrono.prototype.stop = function () {
        clearTimeout(this.timerId);
    };
    Chrono.prototype.reset = function () {
        this.startTime = new Date();
    };
    Chrono.prototype.continue = function () {
        if (this.type == ChronoType.Inspection && this.sec > 14) {
            clearTimeout(this.timerId);
        }
        else {
            this.timerId = setTimeout('loop()', 10);
        }
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
    }
    Controller.prototype.dump = function () {
        this.model.dump();
    };
    return Controller;
}());
//# sourceMappingURL=tsc.js.map