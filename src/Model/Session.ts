
class Session {
    name :string;
    solves :Array<Solve>;

    constructor(name = 'Default')
    {
        this.name = name;
        this.solves = new Array();
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