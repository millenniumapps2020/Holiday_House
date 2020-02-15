
import { STORE_LOGGED_USER } from '../actions/actions'

const intialState = {
    userName: ""
}

const login = (state = intialState, action) => {
    if (action.type === STORE_LOGGED_USER) {
        return Object.assign({}, state, { userName: action.payload });
    } else {
        return state;
    }
};

export default login;