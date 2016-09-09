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
export default TeamImage = ({teamName, savePick, picks, userName, selected}) => {
  return (
    <View style = {styles.teamContainer}>
      <Text style = {styles.teamText}>{teamName}</Text>
      <TouchableHighlight
        onPress= {()=>{savePick(teamName);}}
        underlayColor = "#F5FCFF"
        style={[styles.border,selected && styles.selected]}>
        <Image
          source = {TeamImages[teamName]}
          style = {styles.pic} />
      </TouchableHighlight>
      {picks && picks.map((user, index) => {
        if(user != userName)
          return  <Text key={index}>{user}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
  border:{
    borderWidth:8,
    borderRadius:90,
    borderColor:'#fff'
  },
  selected:{
    borderColor:"#45dd55",

  }
});
