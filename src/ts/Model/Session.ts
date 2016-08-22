
class Session {
    name :string;
    solves :Array<Solve>;

    constructor(name = 'Default')
    {
        this.name = name;
        this.solves = new Array();
    }

    addSolve(newSolve :Solve)
    {
        this.solves.push(newSolve);
    }

    deleteSolve(index :number)
    {
        if (this.getNumberOfSolves() <= index)
        {
            this.solves.splice(index);
        }
    }

    getNumberOfSolves()
    {
        if (this.solves == null) return 0;
        else return this.solves.length;
    }
}