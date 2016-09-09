import React from "react";
import {Actions, Scene} from "react-native-router-flux";
import HomePage from "./components/home/HomePage";
import WeeksPage from "./components/weeks/WeeksPage";
import GamesPage from "./components/games/GamesPage";
import PickGamePage from "./components/games/PickGamePage";
import LoginPage from "./components/login/LoginPage";
import SettingsPage from "./components/settings/SettingsPage";
import ScoresPage from "./components/scores/ScoresPage";
export default routes = Actions.create(
  <Scene key="root">
    <scene key="login" initial hideNavBar component={LoginPage}/>
    <Scene key="home" component={HomePage} hideBackImage hideNavBar = {false} title="KTB"/>
    <Scene key ="weeks" component={WeeksPage} title="Weeks"/>
    <Scene key ="games" component={GamesPage} title="Games"/>
    <Scene key ="select" component={PickGamePage}/>
    <Scene key ="settings" component={SettingsPage} title="Settings"/>
    <Scene key ="scores" component={ScoresPage} title="Scores"/>
  </Scene>
);
