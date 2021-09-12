import React, { Component } from 'react';
import { Unsubscribe } from 'redux';
import Header from '../Header/Header';
import UpdateList from '../UpdateList/UpdateList';
import AppTypes from './types.d';

import './App.css';

export default class App extends Component<AppTypes.IProps, AppTypes.IState> {
  drizzle: any;
  drizzleState: any;

  constructor(props: AppTypes.IProps) {
    super(props);
    
    this.drizzle = props.drizzle;
    this.drizzleState = props.drizzleState;

    this.state = {
      getCountDataKey: null,
      loading: true,
      drizzleState: null,
      updates: []
    };
  }

  render() {
    return (
      <>
        <Header headerText="Amazin' Status"
          imageAltText="Amazin' Logo"
          imageSrc="./logo192.png"
          linkDescription="Link to Amazin's company website"
          linkHref="#" />
        <UpdateList updates={this.state.updates} />
      </>
    );
  }
};
