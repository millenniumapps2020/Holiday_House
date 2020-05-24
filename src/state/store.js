import { createStore, combineReducers, compose } from "redux";

import login from './reducers/LoginReducer'
import shortList from './reducers/ShortListReducer'
import appDialog from './reducers/AppDialogReducer'

import { RESET_APP } from './actions/actions'

const appReducers = combineReducers(
    {
        login,
        shortList,
        appDialog
    }
);

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null)
            return undefined

        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (value) => {
    try {
        const serializedState = JSON.stringify(value)
        localStorage.setItem('state', serializedState)
    } catch (err) {

    }
}

const devTools = 'production' !== process.env.NODE_ENV
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

const rootReducer = (state, action) => {
    state = loadState()
    if (action.type === RESET_APP)
        state = undefined;

    return appReducers(state, action);
}

const store = createStore(rootReducer, {}, compose(devTools));

store.subscribe(() => {
    saveState({ login: store.getState().login })
})

export default store;