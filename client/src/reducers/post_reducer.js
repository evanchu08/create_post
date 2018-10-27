import {ADD_POST, SET_POST_LOADING, GET_POST, DELETE_POST, GET_POST_BY_ID
    
} from '../actions/types';

const initState ={
    posts: [],
    post: {},
    isLoading: false
}

export default function(state = initState, action) {
    switch(action.type){
        case SET_POST_LOADING:
        return {
            ...state,
            isLoading: true
        }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
                isLoading: false
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case GET_POST_BY_ID: 
            return {
                ...state,
                post: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}