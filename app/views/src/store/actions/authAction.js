import axios from 'axios';
import { GET_ERRORS } from './types';

// Login User
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => console.log(res.data))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}