import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import reducer from './redux/reducers';

import { factory as storeFactory } from './redux/storeFactory';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = storeFactory(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
