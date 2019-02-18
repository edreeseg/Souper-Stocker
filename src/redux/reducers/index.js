import {
  LOADING,
  ERROR,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  DELETE_USER_SUCCESS,
  SET_OPERATION,
  GET_INVENTORY_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
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
  currentOperation: null,
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
    case SET_OPERATION:
      return { ...state, error: null, currentOperation: action.payload };
    case GET_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload,
        categories: Array.from(
          new Set(action.payload.map(item => item.category_id))
        ),
        error: null,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload,
        categories: Array.from(
          new Set(action.payload.map(item => item.category_id))
        ),
        error: null,
      };
    case UPDATE_ITEM_SUCCESS: {
      const newInventory = state.inventory.map(item => {
        return item.id === action.payload.id ? action.payload : item;
      });
      return {
        ...state,
        loading: false,
        inventory: newInventory,
        categories: Array.from(
          new Set(newInventory.map(item => item.category_id))
        ),
        error: null,
      };
    }
    case DELETE_ITEM_SUCCESS: {
      const newInventory = state.inventory.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        inventory: newInventory,
        categories: Array.from(
          new Set(newInventory.map(item => item.category_id))
        ),
        error: null,
      };
    }
    case DELETE_USER_SUCCESS: // Necessary to update state?  How to indicate success?
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
