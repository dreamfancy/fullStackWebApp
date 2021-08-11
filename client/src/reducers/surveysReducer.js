import { FETCH_SURVEYS } from "../actions/types";

const surveysReducer = (state=[], action) => {
    switch (action.type) {
        case FETCH_SURVEYS:
            return [ ...state, action.payload ];
        default:
        return state;
    }
};

export default surveysReducer;