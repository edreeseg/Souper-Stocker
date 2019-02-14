import {
  LOADING,
  GET_INVENTORY_SUCCESS,
  EDIT_INVENTORY,
  ADD_ITEM_SUCCESS,
  LOGIN,
  ERROR,
} from '../actions';

const initialState = {
  error: null,
  loading: false,
  userId: null,
  kitchen: null,
  inventory: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_INVENTORY_SUCCESS:
      return { ...state, loading: false, inventory: action.payload };
    case ADD_ITEM_SUCCESS:
      return { ...state, loading: false, inventory: action.payload };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
