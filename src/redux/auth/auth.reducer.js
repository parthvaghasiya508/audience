import { TOKEN } from './auth.types';

const INITIAL_STATE = {
    token: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case TOKEN:
            return {
                ...state, token: payload.token,
            };
        default: return state;
    }
};

export default reducer;