import React from 'react';
import {View, TouchableHighlight, Text, TextInput, StyleSheet} from 'react-native'

export default class UserNameInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {missingName:false, nameAlreadyUsed:false}
    this.validateName = this.validateName.bind(this);
  }

  validateName() {
    if (!this.username) {
      return this.setState({missingName:true});
    }
    this.props.next(this.username)
  }
  render(){
    return(
      <View style={styles.inputContainer}>
        <Text>Pick a display name:</Text>
        <TextInput onChangeText = {(text)=> this.username = text} style = {styles.input} placeholder = "Display Name" />
        {this.state.missingName && <Text style = {styles.errorText}>Please provide a display name</Text>}
        <TouchableHighlight
          style= {styles.button}
          onPress = {this.validateName}
        >
          <Text style = {styles.buttonText}> Continue </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  button:{
    height: 50,
    alignSelf: 'stretch',
    justifyContent:'center',
    backgroundColor: '#0091CA',
  },
  errorText:{
    color:'red',
    paddingBottom:10,
  },
  inputContainer:{
    marginLeft:30,
    marginRight:30
  },
  input:{
    height: 50,
    padding:4,
    fontSize:18,
    borderWidth:1,
    borderColor: '#0091CA',
    marginVertical: 10,
  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center',
    justifyContent:'center'
  },
});
