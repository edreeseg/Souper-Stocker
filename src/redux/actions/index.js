import * as data from '../../dummyData';

export const LOADING = 'LOADING';
export const GET_INVENTORY = 'GET_INVENTORY';
export const GET_KITCHEN_SUCCESS = 'GET_KITCHEN_SUCCESS';
export const EDIT_INVENTORY = 'EDIT_INVENTORY';
export const LOGIN = 'LOGIN';

export const getKitchen = id => dispatch => {
  dispatch({ type: LOADING });
  const kitchen = data.kitchen; // Would normally be an axios call.
  setTimeout(
    () => dispatch({ type: GET_KITCHEN_SUCCESS, payload: kitchen }),
    3000
  );
};
