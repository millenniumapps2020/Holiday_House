import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from './App';
import store from './state/store'
import './index.css';
import './assets/css/bootstrap.min.css';
import 'rheostat/initialize';
import "react-image-gallery/styles/css/image-gallery.css";


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
