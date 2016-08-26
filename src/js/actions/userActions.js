import {AsyncStorage} from 'react-native';
import * as types from './actionTypes';
import {Actions, ActionConst} from 'react-native-router-flux';
import {loadPicks} from './gameActions'
function userLoggedInSuccess(userName, id) {
  return {type: types.LOG_IN_SUCCESS, userName, id}
}
export function noUser() {
  return {type: types.NO_USER}
}
function userLoggedOut() {
  return {type: types.LOG_OUT}
}

export function saveUser(userName, uid){
  return function (dispatch) {
    let updates = {};
    updates['users/' + uid] = {userName};
    firebase.database().ref().update(updates).then(() => {
      dispatch(userLoggedInSuccess(userName, uid))
    });
  }
}


export function loadUser() {
  return function (dispatch) {
    AsyncStorage.getItem('user').then( (user) => {
      user = JSON.parse(user);
      dispatch(userLoggedInSuccess(user.userName, user.uid))
      dispatch(loadPicks(user.uid));
      Actions.home(ActionConst.REPLACE)
    })
  }
}
export function loginUser(credential,userName) {
  return function (dispatch) {
    return firebase.auth().signInWithCredential(credential).then( (user) => {
      dispatch(saveUser(userName, user.uid));
      return user.uid
    })
    .catch( (err) => {
      //TODO add alert saying login failed and go back to login screen.
    });
  }
}
export function logOut() {
  return dispatch => {
    firebase.auth().signOut().then(() =>{
      dispatch(userLoggedOut());
      AsyncStorage.clear();
      Actions.login(ActionConst.REPLACE);
    })
  }
}
