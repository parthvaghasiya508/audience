import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import contactReducer from './contact/contact.reducer';
import tagReducer from './tag/tag.reducer';

const rootReducer = combineReducers({
    token: authReducer,
    contact: contactReducer,
    tag: tagReducer,
});

export default rootReducer;