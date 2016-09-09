import React from 'react';
import{
  View,
  Text,
  ListView,
} from 'react-native';

import GameItem from './GameItem';
import GameSectionHeader from './GameSectionHeader';
export default GamesList  =  ({games, picks}) => {

  return(
    <ListView
      dataSource = {games}
      renderRow = {(game) => {
        return <GameItem pick ={picks[game.id]} game={game}/>;
      }}
      renderSectionHeader = {(sectionData,sectionID) => <GameSectionHeader sectionData={sectionData} sectionID={sectionID}/>}
    />);
};
