import { GET_TAGS } from './tag.types';

const INITIAL_STATE = {
    list: []
};

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_TAGS:
            return { ...state, list: payload };
        default:
            return state;
    }
};

export default reducer;