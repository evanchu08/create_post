import {PROFILE_LOADING, GET_USER_PROFILE, CLEAR_PROFILE, 
    GET_ALL_PROFILES
} from '../actions/types';

const initState = {
    profile: null,
    profiles: null,
    isLoading: false
}

export default function (state = initState, action) {
    switch(action.type){
        case PROFILE_LOADING: 
            return {
                ...state,
                isLoading: true
            }
        case GET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        case CLEAR_PROFILE: 
            return {
                ...state,
                profile: null
            }
        case GET_ALL_PROFILES: 
            return {
                ...state,
                profiles: action.payload,
                isLoading: false
            }
        default: 
            return state;
    }
}