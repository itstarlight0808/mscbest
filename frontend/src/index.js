import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.less';
import "bootstrap/dist/js/bootstrap.min";
import App from './App';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);