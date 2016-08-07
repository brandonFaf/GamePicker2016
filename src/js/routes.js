import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import HomePage from './components/home/HomePage';
import WeeksPage from './components/weeks/WeeksPage';
import GamesPage from './components/games/GamesPage';
export default routes = Actions.create(
  <Scene key='root'>
    <Scene key='home' initial={true} component={HomePage} title="KTB"/>
    <Scene key ='weeks' component={WeeksPage} title="Weeks"/>
    <Scene key ='games' component={GamesPage} title="Games"/>
  </Scene>
)
