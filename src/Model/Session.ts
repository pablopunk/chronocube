
import { Solve } from './Solve';

export class Session {
    name :string;
    solves :Array<Solve>;
    active :boolean;

    constructor(name = 'Default', active = true, solves = new Array())
    {
        this.name = name;
        this.active = active;
        this.solves = solves;
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
}