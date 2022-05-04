import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';
import './i18n';
import { Provider } from 'react-redux';
import configureStore from './store';
// import Pending from './components/Pending';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <Suspense fallback={<div>Pending...</div>}>
    <Provider store={store}>
        <App/>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
