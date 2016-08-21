import {AsyncStorage} from 'react-native';
import * as types from './actionTypes';
import {Actions, ActionConst} from 'react-native-router-flux';
function userLoggedInSuccess(userName, id) {
  return {type: types.Log_IN_SUCCESS, userName, id}
}
function noUser() {
  return {type: types.NO_USER}
}

function userSaved(id) {
  return {type: types.USER_SAVED, id}
}

export function saveUser(userName){
  return function (dispatch) {
    const uid = firebase.database().ref('users').push().key;
    let updates = {};
    updates['users/' + uid] = {userName};
    return firebase.database().ref().update(updates).then(() => {
      dispatch(userSaved(uid))
      return uid
    });
  }
}

export function loginUser(credential,userName, id) {
  return function (dispatch) {
    return firebase.auth().signInWithCredential(credential).then( (user) => {
      dispatch(userLoggedInSuccess(userName, id));
    })
    .catch( (err) => {
      //TODO add alert saying login failed and go back to login screen.
    });
  }
}

export function checkUserStatus() {
  return function (dispatch) {
    AsyncStorage.getItem('credentials').then( (savedCredentials) => {
      if (savedCredentials) {
        savedCredentials = JSON.parse(savedCredentials);
        let credential;
        if (savedCredentials.provider == 'twitter') {
          credential = firebase.auth.TwitterAuthProvider.credential(savedCredentials.oauthToken, savedCredentials.oauthTokenSecret);
        }
        if (savedCredentials.provider == 'facebook') {
          credential = firebase.auth.FacebookAuthProvider.credential(savedCredentials.accessToken);
        }
        loginUser(credential, savedCredentials.userName, savedCredentials.id )(dispatch).then(() => {
          dispatch({type:types.HIDE_LOADING});
          Actions.home({type:ActionConst.REPLACE});
        })
      }
      else{
        dispatch(noUser());
      }
    });
  }
}
