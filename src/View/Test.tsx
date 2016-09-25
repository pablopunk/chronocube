import * as React from "react";

export class Test extends React.Component<{},{}>  {

    constructor() {
        super();
    }

    render() {
        return (
            <div style={{fontFamily: 'Roboto'}}>Hello, this should be Roboto Font</div>
        )
    }
}