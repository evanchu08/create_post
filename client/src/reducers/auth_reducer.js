import {Register_User, SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../components/validation/is_empty';

const initState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initState, action) {
    switch(action.type){
        case Register_User:
            return {
                ...state,
                user: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }        
        default: 
            return state;
    }
}