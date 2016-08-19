import * as types from '../actions/actionTypes.js';

export default function userReducer(state = {loading:true}, action) {
  switch (action.type) {
    case types.Log_IN_SUCCESS:
      return false;
    case types.NO_USER:
      return false;
    default:
      return state;
  }
}
