import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const GET_LOC_SUCCESS = 'GET_LOC_SUCCESS';
export const VOLUNTEER = 'VOLUNTEER';

export const getLocations = user => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  axios
    .get('https://soup-back-end-2.herokuapp.com/locations', config)
    .then(res => dispatch({ type: GET_LOC_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to get inventory.',
      })
    );
};
