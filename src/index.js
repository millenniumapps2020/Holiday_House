import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './state/store'

import './index.css';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome.min.css'



ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
