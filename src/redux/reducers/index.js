import {
  LOADING,
  ERROR,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_USER_SUCCESS,
  SET_OPERATION,
  GET_INVENTORY_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  ADD_ITEM_SUCCESS,
  GET_LOC_SUCCESS,
} from '../actions';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  refreshing: false,
  updating: null,
  locations: [],
  inventory: [],
  categories: [],
  currentOperation: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        refreshing: action.payload === 'get' ? true : state.refreshing,
        updating:
          typeof action.payload === 'number' ? action.payload : state.updating, // Bad way of telling when an item is updating.
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updating: null,
      };
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
        refreshing: false,
        inventory: action.payload,
        categories: Array.from(
          new Set(action.payload.map(item => item.category_id))
        ).sort(),
        error: null,
      };
    case ADD_ITEM_SUCCESS: {
      const inventory = [...state.inventory, action.payload];
      return {
        ...state,
        loading: false,
        inventory,
        categories: Array.from(
          new Set(inventory.map(item => item.category_id))
        ).sort(),
        error: null,
      };
    }
    case UPDATE_ITEM_SUCCESS: {
      const inventory = state.inventory.map(item => {
        return item.id === action.payload.id ? action.payload : item;
      });
      return {
        ...state,
        loading: false,
        inventory,
        updating: null,
        categories: Array.from(
          new Set(inventory.map(item => item.category_id))
        ).sort(),
        error: null,
      };
    }
    case DELETE_ITEM_SUCCESS: {
      const inventory = state.inventory.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        inventory,
        categories: Array.from(
          new Set(inventory.map(item => item.category_id))
        ).sort(),
        error: null,
      };
    }
    case DELETE_USER_SUCCESS: // Necessary to update state?  How to indicate success?
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOGOUT:
      const emptyState = {};
      for (let key in state) emptyState[key] = null;
      return {
        ...emptyState,
        categories: [],
        inventory: [],
        locations: [],
        loading: false,
        refreshing: false,
      };
    case GET_LOC_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        locations: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
