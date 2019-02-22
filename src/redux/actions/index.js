export const ERROR = 'ERROR';
export const LOADING = 'LOADING';

export {
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_USER_SUCCESS,
} from './users';

export { register, login, logout, deleteUser, setStoredInfo } from './users';

export {
  SET_OPERATION,
  GET_INVENTORY_SUCCESS,
  ADD_ITEM_SUCCESS,
  UPDATING_ITEM,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from './inventory';

export {
  setOperation,
  getInventory,
  addItem,
  updateItem,
  deleteItem,
} from './inventory';

export { GET_LOC_SUCCESS } from './locations';

export { getLocations } from './locations';
