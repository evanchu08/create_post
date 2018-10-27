import { combineReducers } from 'redux';
import auth from './auth_reducer';
import error  from './error_reducer';
import profile from './profile_reducer';
import post from './post_reducer';

const rootReducer = combineReducers({
    auth,
    error,
    profile,
    post
});
export default rootReducer;