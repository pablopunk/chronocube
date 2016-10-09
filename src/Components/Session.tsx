import * as React from "react";
import { Solve } from './Solve';

export interface SessionProps { name: string; solves: Array<Solve>; }

export class Session extends React.Component<SessionProps,{}> {

    render() {
        return (
            <div>{this.props.name}</div>
        );
    }

    new(newSolve :Solve)
    {
        this.props.solves.push(newSolve);
    }

    remove(index :number)
    {
        if (this.count() <= index)
        {
            this.props.solves.splice(index);
        }
    }

    count()
    {
        if (this.props.solves == null) return 0;
        else return this.props.solves.length;
    }
}