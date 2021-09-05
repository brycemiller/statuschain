import React, { Component } from 'react';
import Update from '../Update/Update';
import UpdateListTypes from './types.d';

import './UpdateList.css';

export default class UpdateList
    extends Component<UpdateListTypes.IProps, UpdateListTypes.IState> {
    constructor(props: UpdateListTypes.IProps) {
        super(props);
        this.state = {
            updates: props.updates
        };
    }

    render() {
        return (
            <main className="updates-container">
                {this.state.updates.map(update => (
                    <Update key={update.id} {...update} />
                ))}
            </main>
        );
    }
}
