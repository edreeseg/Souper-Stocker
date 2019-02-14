import axios from 'axios';
import * as data from '../../dummyData';

export const LOADING = 'LOADING';
export const GET_INVENTORY_SUCCESS = 'GET_LOCATION_SUCCESS';
export const ERROR = 'ERROR';
export const EDIT_INVENTORY = 'EDIT_INVENTORY';
export const LOGIN = 'LOGIN';

export const getInventory = id => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get(`http://localhost:5500/inventory/${id}`) // id will be dynamic based on user
    .then(res => dispatch({ type: GET_INVENTORY_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload:
          err.response.data.message ||
          'There was an error while attempting to get inventory.',
      })
    );
};
