import React, { Component } from 'react';
import AppTypes from './types';

import './App.css';
import Header from '../Header/Header';
import { versionMajorMinor } from 'typescript';

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

    return (
      <>
        <Header headerText="Amazin' Status"
          imageAltText="Amazin' Logo"
          imageSrc="./logo192.png"
          linkDescription="Link to Amazin's company website"
          linkHref="#" />
        <main className="App"><div>{this.message}</div></main>
      </>
    );
  }
};
