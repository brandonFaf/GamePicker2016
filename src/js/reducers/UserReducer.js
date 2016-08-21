import * as types from '../actions/actionTypes.js';
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case types.Log_IN_SUCCESS:
      return Object.assign({},state, {userName:action.userName, id:action.id});
    case types.USER_SAVED:
      return Object.assign({},state, {id:action.id})
    default:
      return state;
  }
}
