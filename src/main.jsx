import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
