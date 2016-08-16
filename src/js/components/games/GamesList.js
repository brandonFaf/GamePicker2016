import React from 'react';
import{
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import GameItem from './GameItem';

export default GamesList  =  ({games}) => {
  function renderSectionHeader(sectionData, sectionID) {
    return (
        <View style={styles.section}>
            <Text style={styles.text}>{sectionID}</Text>
        </View>
    );
  }

  return(
    <ListView
      dataSource = {games}
      renderRow = {(game) => {
        return <GameItem game={game}/>
      }}
      renderSectionHeader = {renderSectionHeader}
    >
    </ListView>)
};

const styles = StyleSheet.create({
  section: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#ddd'
    },
})