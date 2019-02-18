import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

export { REGISTRATION_SUCCESS, LOGIN_SUCCESS } from './users';
export { register, login } from './users';

export const SET_OPERATION = 'SET_OPERATION';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const GET_INVENTORY_SUCCESS = 'GET_INVENTORY_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const LOGIN = 'LOGIN';

export const getInventory = user => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  axios
    .get(`http://localhost:5500/inventory/${user.location}`, config)
    .then(res => dispatch({ type: GET_INVENTORY_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to get inventory.',
      })
    );
};

export const addItem = (id, obj) => dispatch => {
  dispatch({ type: LOADING });
  const { item, amount, unit, category_id, location_id } = obj;
  if (!item || !amount || !unit || !category_id || !location_id)
    return dispatch({
      type: ERROR,
      payload:
        'Items must include name, amount, unit, category_id, and location_id keys.',
    });
  const newItem = { item, amount, unit, category_id, location_id };
  axios
    .post(`http://localhost:5500/inventory/${id}`, newItem)
    .then(res => dispatch({ type: ADD_ITEM_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to add item.',
      })
    );
};

export const setOperation = operation => dispatch => {
  dispatch({ type: SET_OPERATION, payload: operation });
};
export const deleteItem = id => dispatch => {
  dispatch({ type: LOADING });
  axios
    .delete(`http://localhost:5500/${id}`)
    .then(res => dispatch({ type: DELETE_ITEM_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to add item.',
      })
    );
};
