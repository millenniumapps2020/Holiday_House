import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize';
import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './state/store'
import 'react-dates/lib/css/_datepicker.css';
import './index.css';
import './assets/css/bootstrap.min.css';



ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
