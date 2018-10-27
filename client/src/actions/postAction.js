import axios from 'axios';
import { ADD_POST, GET_ERRORS , SET_POST_LOADING, GET_POST, CLEAR_ERROR 
    , DELETE_POST, GET_POST_BY_ID} from './types';

//add Post
export const addPost = newPost => dispatch => {
    dispatch(clearError());
    axios.post('/api/post/', newPost)
        .then(response => dispatch({
            type: ADD_POST,
            payload: response.data
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//get All post
export const getPost = () => dispatch => {
    dispatch(setPostLoading());
    axios.get('/api/post/')
        .then(response => dispatch({
            type: GET_POST,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null
        }))
}

//get Single Post by Id
export const getPostById = id => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/post/${id}`)
        .then(response => dispatch({
            type: GET_POST_BY_ID,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: GET_POST_BY_ID,
            payload: null
        }))
}

//set init post
export const setPostLoading = () =>{
    return {
        type: SET_POST_LOADING
    }
}

// delete post by id
export const deletePost = id => dispatch =>{
    axios.delete(`/api/post/${id}`)
        .then(response => dispatch({
            type: DELETE_POST,
            payload: id
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
} 

export const likePost = id => dispatch =>{
        axios.post(`/api/post/like/${id}`)
            .then(response => dispatch({
                type: GET_POST_BY_ID,
                payload: response.data
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}


export const unLikePost = id => dispatch =>{
    axios.post(`/api/post/unlike/${id}`)
        .then(response => dispatch({
            type: GET_POST_BY_ID,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

//add Comment by Post Id
export const addComment = (postId, commentData) => dispatch =>{
    dispatch(clearError());
    axios.post(`/api/post/comment/${postId}`, commentData)
        .then(response => dispatch({
            type: GET_POST_BY_ID,
            payload: response.data
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//delete Comment by Comment Id
export const deleteComment = (post_id, comment_id) => dispatch =>{
    axios.delete(`/api/post/${post_id}/comment/${comment_id}`)
        .then(response => dispatch(getPostById(post_id))).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

