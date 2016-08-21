import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native'

export default LoginButtons = ({chooseProvider}) => {
  return (
    <View>
      <TouchableHighlight
        style= {[styles.button, styles.Twitter ]}
        onPress = {()=>chooseProvider('twitter')}
      >
        <Text style = {styles.buttonText}> Login with Twiter </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style= {[styles.button, styles.Facebook ]}
        onPress = {()=>chooseProvider('facebook')}
      >
        <Text style = {styles.buttonText}> Login with Facebook </Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  button:{
    height: 50,
    alignSelf: 'stretch',
    margin: 10,
    justifyContent:'center',
  },
  Twitter:{
    backgroundColor: '#0091CA',
  },
  Facebook:{
    backgroundColor:'#3A5CA9'
  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center',
    justifyContent:'center'
  },
});
