
class Solve {
    min :number;
    sec :number;
    dec :number;
    scramble :string;

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
        let str :string = this.min+':'+this.sec+'.'+this.dec;
        return str;
    }
}