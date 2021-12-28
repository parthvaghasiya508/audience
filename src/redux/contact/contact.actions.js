import { GET_CONTACTS, SEARCH_CONTACTS, GET_MORE_CONTACTS } from './contact.types';
import { getContactsAPI, searchContactsAPI } from '../../services/contact.service';

export const getcontacts = (param) => async(dispatch) => {
    try {
        let res = await getContactsAPI(param);
        dispatch({ type: GET_CONTACTS, payload: {contacts:res.data?.contacts,  nextPage:res.data?.nextPage, filterQuery:param.filterQuery }   });
    } catch (error) {
        console.log("error",error.message);
    }   
}

export const getMorecontacts = (param) => async(dispatch) => {
    try {
        let res = await getContactsAPI(param);
        dispatch({ type: GET_MORE_CONTACTS, payload: {contacts:res.data?.contacts,  nextPage:res.data?.nextPage, filterQuery:param.filterQuery } });
    } catch (error) {
        console.log("error",error.message);
    }   
}

export const SearchContacts = (param) => async(dispatch) => {
    try {
        let res = await searchContactsAPI(param);
        dispatch({ type: SEARCH_CONTACTS, payload: {contacts:res.data.contacts, nextPage:res.data.nextPage, searchQuery:param.searchquery} });
    } catch (error) {
        console.log("error",error.message);
    }   
}