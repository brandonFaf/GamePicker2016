import * as types from '../actions/actionTypes.js';
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case types.Log_IN_SUCCESS:
      return Object.assign({}, state, {loggedIn:true});
    case types.SET_USERNAME:
      return Object.assign({},state, {userName:action.userName})
    default:
      return state;
  }
}
