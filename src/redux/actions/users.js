import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const register = object => dispatch => {
  dispatch({ type: LOADING });
  const { name, title, username, password, email, role_id, loc_id } = object;
  if (!name || !title || !username || !password || !email || role_id === null)
    return dispatch({
      type: ERROR,
      payload:
        'Registration request must include name, title, username, password, email, and role_id keys.',
    });
  const user = { name, title, username, password, email, role_id };
  if (loc_id) user.loc_id = loc_id;
  axios
    .post('https://soup-back-end-2.herokuapp.com/users/register', user)
    .then(res => dispatch({ type: REGISTRATION_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to get inventory.',
      })
    );
};

export const login = user => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post('https://soup-back-end-2.herokuapp.com/users/login', user)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to get inventory.',
      })
    );
};

export const setStoredInfo = user => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, payload: user });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const deleteUser = id => dispatch => {
  dispatch({ type: LOADING });
  axios
    .delete(`https://soup-back-end-2.herokuapp.com/${id}`)
    .then(res => dispatch({ type: DELETE_USER_SUCCESS, payload: res.data })) // Returns number of deleted items - need to test?
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to get inventory.',
      })
    );
};
