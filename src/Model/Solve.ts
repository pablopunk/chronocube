import {Storable} from './Storage'

export class Solve extends Storable {
    min :number;
    sec :number;
    dec :number;
    scramble :string;

    constructor(min = 0, sec = 0, dec = 0, scramble = "") {
        super()
        this.min = min;
        this.sec = sec;
        this.dec = parseInt(dec.toString().slice(0,2));
        this.scramble = scramble;
    }

    getProps()
    {
        return {
            'min' : this.min,
            'sec' : this.sec,
            'dec' : this.dec,
            'scramble' : this.scramble
        }
    }

    setTime(time :string)
    {
        let re :RegExp = /^([0-9]{2}):([0-5])([0-9])\.([0-9]{2})$/;
        if (! time.match(re) ) {
            console.log('String '+ time +' doesn\'t seem like a correct time');
            return;
        }
        this.min = parseInt(time.substr(0,2));
        this.sec = parseInt(time.substr(3,5));
        this.dec = parseInt(time.substr(6,8));
    }

    getTime()
    {
        return Solve.normalizeToString(this.min, this.sec, this.dec);
    }

    getTimeShort(hideDec = false)
    {
        if (!this.min && !this.sec && !this.dec) return '-'
        let m = this.min > 0 ? this.min+":" : ""
        let d = hideDec ? "" : "."+this.dec
        return m+this.sec+d
    }

    // get time as a number to compare and calculate
    getTimeRaw()
    {
        var time = this.dec;
        time += (this.sec * 100);
        time += (this.min * 100 * 60);

        return time;
    }

    static compare(a: Solve, b: Solve)
    {
        return a.getTime().localeCompare(b.getTime())
    }

    static normalizeToNumbers(rawTime :number)
    {
        var rawString = rawTime.toString();
        var l = rawString.length;
        var dec = parseInt(rawString.slice(l-2, l)) // last two digits

        if (rawTime < 100) {
            return {"min":0, "sec":0, "dec":rawTime}
        }

        if (rawTime < 6000) {
            var sec = parseInt((rawTime < 1000 ? "0" + rawString.charAt(0) : rawString.slice(0,2)))
            return {"min":0, "sec":sec, "dec":rawTime}
        }

        var min = Math.floor(rawTime / 6000);
        var sec = parseInt(((rawTime % 6000) / 100).toFixed(0));

        return {"min":min, "sec":sec, "dec":dec}
    }

    static normalizeToString(min :number, sec :number, dec :number)
    {
        let m = min > 9 ? min : "0"+min;
        let s = sec > 9 ? sec : "0"+sec;
        return m+":"+s+"."+(dec.toString().slice(0,2))
    }
}