import {AsyncStorage} from 'react-native';
import * as types from './actionTypes';
import {Actions} from 'react-native-router-flux';
function userLoggedInSuccess(displayName) {
  return {type: types.Log_IN_SUCCESS, displayName}
}
function noUser() {
  return {type: types.NO_USER}
}
export function setUserName(userName) {
  return {type: types.SET_USERNAME, userName};
}
export function loginUser(credential) {
  return function (dispatch) {
    firebase.auth().signInWithCredential(credential).then( (user) => {
      dispatch(userLoggedInSuccess(user.displayName));
    })
    .catch( (err) => {
      //TODO add alert saying login failed and go back to login screen.
    });
  }
}

export function checkUserStatus() {
  return function (dispatch) {
    //AsyncStorage.clear();
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
        loginUser(credential)(dispatch)
        dispatch(setUserName(savedCredentials.userName));
        Actions.home();
      }
      else{
        dispatch(noUser());
      }
    });
  }
}
