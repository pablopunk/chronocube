import * as React from "react";
import { Solve } from './Solve';

export interface SessionProps { name: string; solves: Array<Solve>; }

export class Session extends React.Component<SessionProps,{}> {

    render() {
        var rows = this.props.solves.map(function(solve, i) {
            return (
                <Solve key={i} dec={solve.props.dec} sec={solve.props.sec} min={solve.props.min} scramble={solve.props.scramble}/>
            );
        });

        return (
            <div>
                {this.props.name}
                <div>{rows}</div>
            </div>
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