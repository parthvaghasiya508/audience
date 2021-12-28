import { GET_CONTACTS, GET_MORE_CONTACTS, SEARCH_CONTACTS } from './contact.types';

const INITIAL_STATE = {
    list: [], nextPage: "", filterQuery: {
        enable: false,
        searchQuery: '',
        includeTags: [],
        excludeTags: [],
        messageSent: [],
        messageRecieved: [],
    }
};

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONTACTS:
            return { ...state, list: payload.contacts, nextPage: payload.nextPage, filterQuery:payload.filterQuery };
        case GET_MORE_CONTACTS:
            return {
                ...state,
                list: state.list.concat(payload.contacts),
                nextPage: payload.nextPage
            };
        case SEARCH_CONTACTS:
            return {
                ...state, 
                list: payload.contacts, 
                nextPage: payload.nextPage, 
                filterQuery: {
                    ...state.filterQuery,
                    enable: true,
                    searchQuery: payload.searchQuery
                }
            };
        default:
            return state;
    }
};

export default reducer;