import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const SET_OPERATION = 'SET_OPERATION';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const GET_INVENTORY_SUCCESS = 'GET_INVENTORY_SUCCESS';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';

export const getInventory = user => dispatch => {
  dispatch({ type: LOADING, payload: 'get' });
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  axios
    .get(
      `https://soup-back-end-2.herokuapp.com/inventory/${user.location}`,
      config
    )
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

export const addItem = (obj, user) => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  const { item, amount, unit, min_quan, bw_img, color_img, category_id } = obj;
  const location_id = user.location;
  if (
    !item ||
    !amount ||
    !unit ||
    !min_quan ||
    !bw_img ||
    !color_img ||
    !category_id ||
    !location_id
  )
    // color_img and bw_img required attributes?  Default value?
    return dispatch({
      type: ERROR,
      payload:
        'Items must include name, amount, unit, min_quan, and category_id keys.',
    });
  const newItem = {
    item,
    amount,
    unit,
    min_quan,
    bw_img,
    color_img,
    category_id,
    location_id,
  };
  axios
    .post(
      `https://soup-back-end-2.herokuapp.com/inventory/${location_id}`,
      newItem,
      config
    )
    .then(res => dispatch({ type: ADD_ITEM_SUCCESS, payload: res.data[0] })) // Returns an array of one on success.
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

export const deleteItem = (id, user) => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  axios
    .delete(`https://soup-back-end-2.herokuapp.com/inventory/${id}`, config)
    .then(res => dispatch({ type: DELETE_ITEM_SUCCESS, payload: id }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to add item.',
      })
    );
};

export const updateItem = (id, changes, user) => dispatch => {
  dispatch({ type: LOADING, payload: id });
  const { item, amount, unit } = changes;
  if (!item || !amount || !unit)
    return dispatch({ type: ERROR, payload: 'All fields must have values.' });
  const newItem = { item, amount, unit };
  const config = {
    headers: {
      Authorization: user.token,
      role: user.role,
    },
  };
  axios
    .put(
      `https://soup-back-end-2.herokuapp.com/inventory/${id}`,
      newItem,
      config
    )
    .then(res => dispatch({ type: UPDATE_ITEM_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response
          ? err.response.data.message
          : 'There was an error while attempting to add item.',
      })
    );
};
