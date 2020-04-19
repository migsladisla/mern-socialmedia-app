import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from './../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Login User
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}

// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log(userData)
  axios.post('/api/users/register', userData)
    .then(res => history.push('/'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}