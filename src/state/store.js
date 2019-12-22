import { createStore, combineReducers, compose } from "redux";

import login from './reducers/LoginReducer'

import { RESET_APP } from './actions/actions'

const appReducers = combineReducers(
    {
        login
    }
);

const devTools = 'production' !== process.env.NODE_ENV
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

const rootReducer = (state, action) => {
    if (action.type === RESET_APP)
        state = undefined;

    return appReducers(state, action);
}

const store = createStore(rootReducer, {}, compose(devTools));


export default store;