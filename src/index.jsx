import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle, generateStore } from '@drizzle/store';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import Status from './contracts/Status.json';

import './index.css';

const drizzleOptions = {
  contracts: [ Status ] , //Work-around due to error in ABI type
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};
const drizzleStore = generateStore({ drizzleOptions });
const drizzleProvider = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzleProvider}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const {drizzle, drizzleState, initialized} = drizzleContext;

          if(!initialized) {
            return "Loading..."
          }

          return (
            <App drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
