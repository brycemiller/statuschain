import React, { Component } from 'react';
import { AppTypes } from './types';

import './App.css';

export default class App extends Component<AppTypes.IProps, AppTypes.IState> {
  unsubscribe : any;
  message: string = "";

  constructor(props: AppTypes.IProps) {
    super(props);
    this.state = { loading: true, drizzleState: null };
  }

  componentDidMount() {
    const { drizzleStore } = this.props;

    this.unsubscribe = drizzleStore.subscribe(() => {
      const drizzleState = drizzleStore.getState();

      if (drizzleState.drizzleStatus.initialized)
        this.setState({ loading: false, drizzleState });
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    this.message = this.state.loading ? "Loading drizzle..." : "Drizzle loaded!";

    return <div className="App">{this.message}</div>;
  }
};
