import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const register = object => dispatch => {
  dispatch({ type: LOADING });
  const { name, title, username, password, role_id, loc_id } = object;
  console.log(role_id);
  if (!name || !title || !username || !password || role_id === null)
    return dispatch({
      type: ERROR,
      payload:
        'Registration request must include name, title, username, password, and role_id keys.',
    });
  const user = { name, title, username, password, role_id };
  if (object.loc_id) user.loc_id = object.loc_id;
  axios
    .post('http://localhost:5500/users/register', user)
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
    .post('http://localhost:5500/users/login', user)
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
