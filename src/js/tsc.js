var ChronoType;
(function (ChronoType) {
    ChronoType[ChronoType["Timer"] = 1] = "Timer";
    ChronoType[ChronoType["Inspection"] = 2] = "Inspection";
})(ChronoType || (ChronoType = {}));
var Chrono = (function () {
    function Chrono(type) {
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
    return Chrono;
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
    return Solve;
}());
var Session = (function () {
    function Session(name) {
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
    return Session;
}());
var Settings = (function () {
    function Settings() {
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
    return Settings;
}());
//# sourceMappingURL=tsc.js.map