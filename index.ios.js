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
const store = configureStore();
class GamePicker2016 extends Component {
  constructor(){
    super();
    store.dispatch(loadGames());
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
