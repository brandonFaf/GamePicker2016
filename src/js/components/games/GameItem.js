import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default GameItem = ({game, pick}) => {
  return (
    <TouchableHighlight
      onPress={()=> Actions.select({id:game.id})}
      underlayColor = '#ddd'>
      <View style ={styles.row}>
        <Text style={{fontSize:18}}>{game.awayTeam} @ {game.homeTeam} </Text>
        <View style={{flex:1, flexDirection:'row'}}>
          <Text style={styles.dateText}>{pick}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

var styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection:'row',
    padding:18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  dateText:{
    fontSize:15,
    color:'#b5b5b5',
    textAlign:'right'
  },
  rowText:{
    flex:1,
  }
});
