import React, { Component } from 'react';
import Header from '../Header/Header';
import UpdateList from '../UpdateList/UpdateList';
import AppTypes from './types.d';

import './App.css';

export default class App extends Component<AppTypes.IProps, AppTypes.IState> {
  unsubscribe : any;

  constructor(props: AppTypes.IProps) {
    super(props);
    this.state = {
      loading: true,
      drizzleState: null,
      updates: []
    };
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
    if (this.state.loading) return "Loading Drizzle...";

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
