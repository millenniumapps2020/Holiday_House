import { STORE_APP_DIALOG_DETAILS } from '../actions/actions'

const intialState = {
    dialog: {
        show: false,
        header: null,
        title: null,
        message: null,
        buttons: null,
        success: null
    }
}

const login = (state = intialState, action) => {
    if (action.type === STORE_APP_DIALOG_DETAILS) {
        return Object.assign({}, state, { dialog: action.payload });
    } else {
        return state;
    }
};

export default login;