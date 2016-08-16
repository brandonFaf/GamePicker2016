import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import HomePage from './components/home/HomePage';
import WeeksPage from './components/weeks/WeeksPage';
import GamesPage from './components/games/GamesPage';
import PickGamePage from './components/games/PickGamePage';
import LoginPage from './components/login//LoginPage.js';
export default routes = Actions.create(
  <Scene key='root'>
    <scene key='login' initial={true} hideNavBar= {true} component={LoginPage}/>
    <Scene key='home' component={HomePage} hideBackImage = {true} hideNavBar = {false} title="KTB"/>
    <Scene key ='weeks' component={WeeksPage} title="Weeks"/>
    <Scene key ='games' component={GamesPage} title="Games"/>
    <Scene key ='select' component={PickGamePage}/>
  </Scene>
)
