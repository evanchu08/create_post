import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../components/utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/user/register', userData)
        .then(response => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const loginUser = userData => dispatch => {
    axios.post('/api/user/login', userData)
        .then(response => {
            const {token} = response.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        }).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const setCurrentUser = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logOutUser = () => dispatch =>{
    // remove token from 'local-storage'
    localStorage.removeItem('jwtToken');
    // Remove auth for future request
    setAuthToken(false);
    // Set current user to null while set isAuthenticated = false
    dispatch(setCurrentUser({}));
}