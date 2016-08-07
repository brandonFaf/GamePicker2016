import React from 'react';
import{
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class HomePage extends React.Component{
  constructor(){
    super();
    this.go = this.go.bind(this);
  }
  go(){
    console.log("go to weeks");
    Actions.weeks;
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress = {Actions.weeks}>
          <Text style={styles.buttonText}>Make Picks</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress = {()=> console.log("Check Scores")}>
            <Text style={styles.buttonText}>Check Scores</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button:{
    height: 50,
    backgroundColor: '#0091CA',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent:'center',
  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center',
    justifyContent:'center'
  },
});
