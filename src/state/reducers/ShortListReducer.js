import { STORE_SHORTLISTED_HOUSE_COUNT } from '../actions/actions'

const initialState = {
    houseCount: 0
}

const shortList = (state = initialState, action) => {
    if (action.type === STORE_SHORTLISTED_HOUSE_COUNT) {
        return Object.assign({}, state, { houseCount: action.payload });
    } else {
        return state;
    }
}

export default shortList;