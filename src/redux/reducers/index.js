import {
  LOADING,
  ERROR,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  GET_INVENTORY_SUCCESS,
  EDIT_INVENTORY,
  ADD_ITEM_SUCCESS,
} from '../actions';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  kitchen: null,
  inventory: [],
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        error: null,
      };
    case GET_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload,
        categories: Array.from(new Set(action.payload.map(x => x.category_id))),
        error: null,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload,
        categories: Array.from(new Set(action.payload.map(x => x.category_id))),
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
