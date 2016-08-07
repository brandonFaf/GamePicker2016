import React from 'react';
import {Router} from 'react-native-router-flux';
import routes from '../routes.js';
export default class App extends React.Component{
  render(){
    return <Router scenes={routes}/>;
  }
}
