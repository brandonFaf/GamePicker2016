/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage} from 'react-native';
import App from './src/js/components/App';
import configureStore from './src/js/store/configureStore';
import {Provider} from 'react-redux';
import {loadGames, loadPicks} from './src/js/actions/gameActions';
import {noUser, loadUser} from './src/js/actions/userActions'
import firebase from 'firebase';
import firebaseConfig from './src/data/firebaseConfig'
// import firebaseConfig from './src/data/firebaseConfigStaging.js'
import codePush from 'react-native-code-push'
const store = configureStore({loading:true});
firebase.initializeApp(firebaseConfig);
// AsyncStorage.clear()
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user logged in");

    store.dispatch(loadGames());
    store.dispatch(loadUser(user.uid))
    } else {
    console.log("no user");
    store.dispatch(noUser())
  }
});
class GamePicker2016 extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

GamePicker2016 = codePush(GamePicker2016);

AppRegistry.registerComponent('GamePicker2016', () => GamePicker2016);
