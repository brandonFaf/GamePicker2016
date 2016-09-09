import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import {bindActionCreators} from 'redux';
const SettingsPage = ({actions, user}) =>{
  return (
    <View style={styles.container}>
      <Text>Logged in as {user.userName}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress = {actions.logOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableHighlight>
      {user.isAdmin && <TouchableHighlight
        style={styles.button}
        onPress = {actions.toggleAdmin}>
        <Text style={styles.buttonText}>Admin is {user.adminActive?"ON":"OFF"}</Text>
      </TouchableHighlight> }
    </View>
  );
};
function mapStateToProps(state) {
  return {user:state.user};
}
function mapActionsToProps(dispatch) {
  return {actions: bindActionCreators(userActions,dispatch)};
}
export default connect(mapStateToProps,mapActionsToProps)(SettingsPage);

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
