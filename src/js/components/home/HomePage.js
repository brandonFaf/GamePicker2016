import React from 'react';
import{ View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as userActions from '../../actions/userActions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class HomePage extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress = {() => {this.props.userActions.setYearly(false);Actions.weeks()} }>
          <Text style={styles.buttonText}>Make Picks</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress = {() => {this.props.userActions.setYearly(true);Actions.weeks()} }>
          <Text style={styles.buttonText}>Make Picks for the Year</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress ={()=>Actions.scores({userName:this.props.userName})}>
            <Text style={styles.buttonText}>Check Scores</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress = {Actions.settings}>
            <Text style={styles.buttonText}>Settings</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default connect(mapStateToProps,mapActionsToProps)(HomePage)
function mapStateToProps(state) {
  return{
    userName:state.user.userName
  }
}
function mapActionsToProps(dispatch) {
  return{
    userActions:bindActionCreators(userActions, dispatch)
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
