/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/js/components/App';
import configureStore from './src/js/store/configureStore';
import {Provider} from 'react-redux';
import {loadGames} from './src/js/actions/gameActions';
import {checkUserStatus} from './src/js/actions/loginActions'
import firebase from 'firebase';
import firebaseConfig from './src/data/firebaseConfig'

const store = configureStore({loading:true});
firebase.initializeApp(firebaseConfig);
class GamePicker2016 extends Component {
  constructor(){
    super();
    store.dispatch(checkUserStatus())
    // store.dispatch(loadGames());
  }
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}



AppRegistry.registerComponent('GamePicker2016', () => GamePicker2016);
