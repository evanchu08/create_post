import {GET_USER_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, GET_ERRORS,
         SET_CURRENT_USER, GET_ALL_PROFILES} from './types';
import axios from 'axios';

//get current user profile
export const getUserProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile/')
        .then(response => dispatch({
            type: GET_USER_PROFILE,
            payload: response.data
        })).catch(err => dispatch({
            type: GET_USER_PROFILE,
            payload: {}
        })) 
}

export const setProfileLoading = () =>{
    return {
        type: PROFILE_LOADING
    }
}

export const createProfile =(profileData, history) => dispatch =>{
    axios.post('/api/profile/', profileData)
        .then(response => history.push('/dashboard'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))
}

//create Experience
export const createExperience=(expData, history) => dispatch =>{
    axios.post('/api/profile/experience', expData)
    .then(response => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//delete Experience
export const deleteExperience = id => dispatch =>{
    axios.delete(`/api/profile/experience/${id}`)
        .then(response => dispatch({
            type: GET_USER_PROFILE,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//create Education
export const createEducation=(expData, history) => dispatch =>{
    axios.post('/api/profile/school', expData)
    .then(response => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//delete Education
export const deleteEducation = id => dispatch =>{
    axios.delete(`/api/profile/education/${id}`)
        .then(response => dispatch({
            type: GET_USER_PROFILE,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// delete profiles and user account
export const deleteAccount = () => dispatch =>{
    if (window.confirm('Are you sure ? This can NOT be undone')){
        axios.delete('/api/profile/')
            .then(() => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })).catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
    
}

//get all profiles
export const getAllProfiles = () => dispatch =>{
    axios.get('/api/profile/all')
        .then(response => dispatch({
            type: GET_ALL_PROFILES,
            payload: response.data
        })).catch(err => dispatch({
            type: GET_ALL_PROFILES,
            payload: null
        }))
}

//get user handle
export const getProfileByHandle = handle => dispatch =>{
    axios.get(`/api/profile/handle/${handle}`)
        .then(response => dispatch({
            type: GET_USER_PROFILE,
            payload: response.data
        })).catch(err => dispatch({
            type: GET_USER_PROFILE,
            payload: null
        }))
}
export const clearCurrentProfile = () =>{
    return {
        type: CLEAR_PROFILE
    }
}