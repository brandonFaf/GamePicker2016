import * as types from '../actions/actionTypes.js';

export default function userReducer(state = {loading:true}, action) {
  switch (action.type) {
    case types.SHOW_LOADING:
      return true;
    case types.HIDE_LOADING:
      return false;
    case types.NO_USER:
      return false;
    case types.Log_IN_SUCCESS:
      return false;
    default:
      return state;
  }
}
