import React, { Component } from 'react';
import UpdateTypes from './types.d';

import './Update.css';

export default class Update extends Component<UpdateTypes.IProps> {
    id: number = -1;
    impact: UpdateTypes.Severity = UpdateTypes.Severity.None;
    impactString: string;
    heading: string;
    message: string;
    timestamp: number;
    timestampString: string;

    constructor(props: UpdateTypes.IProps) {
        super(props);
        this.id = props.id;
        this.impact = props.impact;
        this.impactString = UpdateTypes.Severity[props.impact];
        this.heading = props.heading;
        this.message = props.message;
        this.timestamp = props.timestamp;
        this.timestampString = new Date(props.timestamp).toLocaleString();
    }

    render() {
        return (
            <article className="update-container">
                <h2 className={`update-heading ${this.impactString}`}>{this.heading}</h2>
                <div className="update-message">{this.message}</div>
                <div className="update-date">{this.timestampString}</div>
            </article>
        );
    }
}
