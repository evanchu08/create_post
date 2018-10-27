import {GET_ERRORS, CLEAR_ERROR} from '../actions/types';

const initState = {}

export default function (state = initState, action) {
    switch(action.type){
        case GET_ERRORS:
            return action.payload
        case CLEAR_ERROR:
            return {}
        default: 
            return state;
    }
}