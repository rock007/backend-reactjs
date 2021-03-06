import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import * as serviceWorker from './serviceWorker';

import initializeStores from './stores/StoreInitializer';

import "tinper-bee/assets/theme/tinper-bee-indigo.css";
//import './css/tinper-bee-theme.css'

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
