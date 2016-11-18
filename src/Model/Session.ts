import {Storable} from './Storage'
import { Solve } from './Solve';

export class Session extends Storable {
    name :string;
    solves :Array<Solve>;
    active :boolean;

    constructor(name = 'Default', active = true, solves = new Array())
    {
        super()
        this.name = name;
        this.active = active;
        this.solves = solves;
    }

    getProps()
    {
        var solves = this.solves.map(function(solve, index) {
            return solve.getProps()
        })
        return {
            'name'   : this.name,
            'solves' : this.solves,
            'active' : this.active
        }
    }

    setProps(props :Object) // this method must be override for complex props
    {
        var self = this
        Object.keys(props).forEach(function(key, index) {
            if (key == 'solves') {
                var solves :Solve[] = props[key]
                solves.forEach(function(solveProps, i) {
                    var solve = new Solve()
                    solve.setProps(solveProps)
                    self.solves.push(solve)
                })
            } else {
                self[key] = props[key]
            }
        })
    }

    new(newSolve :Solve)
    {
        this.solves.push(newSolve);
    }

    remove(index :number)
    {
        if (this.count() <= index)
        {
            this.solves.splice(index);
        }
    }

    count()
    {
        if (this.solves == null) return 0;
        else return this.solves.length;
    }

    // Returns the average of the session in the last N solves
    average(n :number) : Solve
    {
        if (this.count() < n || this.count()<3) return new Solve(0,0,0);
        var average = 0;
        let solves = this.solves.slice(0).sort(Solve.compare);

        // remove the best and the worst solves
        solves.shift(); solves.pop();

        // calculate average
        var min = 0, sec = 0, dec = 0;
        solves.forEach((solve, i) => {
            min = parseInt(solve.getTime().slice(0,2))
            sec = parseInt(solve.getTime().slice(3,5))
            dec = parseInt(solve.getTime().slice(6,8))
            average += ( (min*6000) + (sec*100) + dec )
        });
        average /= (n-2);
        let normalizedAverage = Solve.normalizeToNumbers(average);
        
        return new Solve(normalizedAverage.min, normalizedAverage.sec, normalizedAverage.dec)
    }

    averageAll()
    {
        return this.average(this.count());
    }

    best()
    {
        if (!this.count()) return new Solve(0,0,0)
        let solves = this.solves.slice(0).sort(Solve.compare)
        return solves[0]
    }
}