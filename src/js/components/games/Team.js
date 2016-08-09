import React from 'react';
import {
  TouchableHighlight,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TeamImages from './TeamImages';
export default TeamImage = ({teamName, savePick}) => {
  return (
    <View style = {styles.teamContainer}>
      <Text style = {styles.teamText}>{teamName}</Text>
      <TouchableHighlight
        onPress= {()=>{savePick(teamName); Actions.pop()}}
        underlayColor = '#F5FCFF'>
        <Image
          source = {TeamImages[teamName]}
          style = {styles.pic} />
      </TouchableHighlight>
    </View>
  )
}

var styles = StyleSheet.create({
  teamText:{
    paddingBottom:10,
    fontSize:20
  },
  teamContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  pic:{
    height:120,
    width:120,
    borderRadius:60,
    backgroundColor:'#333'
  },
});
