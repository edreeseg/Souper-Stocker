import {
  LOADING,
  GET_INVENTORY,
  GET_KITCHEN_SUCCESS,
  EDIT_INVENTORY,
  LOGIN,
} from '../actions';

const initialState = {
  userId: null,
  kitchen: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_KITCHEN_SUCCESS:
      return { ...state, kitchen: action.payload };
    default:
      return state;
  }
};

export default reducer;
