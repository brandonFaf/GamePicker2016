import React from 'react';
import{View, Text, TextInput, StyleSheet, TouchableHighlight,} from 'react-native';
import {Actions} from 'react-native-router-flux'
import SocialAuth from 'react-native-social-auth';
import firebase from 'firebase';

import firebaseConfig from '../../../data/firebaseConfig';
import UserNameInput from './UserNameInput'
import LoginButtons from './LoginButtons'

export default class LoginPage extends React.Component{

  constructor(props){
    super(props);
    firebase.initializeApp(firebaseConfig);
    this.state = {loginStage: true};
    this.loginTwitter = this.loginTwitter.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
  }

  loginTwitter(){
    SocialAuth.getTwitterSystemAccounts()
    .then((accounts) => {
      console.log(accounts)
      return SocialAuth.getTwitterCredentials(accounts[0].userName)
    })
    .then((credentials) => {
      console.log(credentials)
      const credential = firebase.auth.TwitterAuthProvider.credential(credentials.oauthToken, credentials.oauthTokenSecret);
      return firebase.auth().signInWithCredential(credential)
    }).then((user) => {
      console.log(user);
      this.setState({loginStage:false})
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  loginFacebook(){
    SocialAuth.setFacebookApp({id:'1261655493853815', name:'KTB Game Picker 2016'});
    SocialAuth.getFacebookCredentials(['email','public_profile'], SocialAuth.facebookPermissionsType.read)
    .then( (credentials) => {
      const credential = firebase.auth.FacebookAuthProvider.credential(credentials.accessToken);
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      console.log(user);
      this.setState({loginStage:false})
    })
    .catch((error) => {
      console.log(error);
    })
  }
  render(){
    return(
      <View>
        <View style = {styles.container}>
          <Text style = {styles.heading}>KTB Pickeroo</Text>
        </View>
        <View>
          {this.state.loginStage ?
                <LoginButtons loginFacebook={this.loginFacebook} loginTwitter={this.loginTwitter}/>
              : <UserNameInput next={Actions.home}/>}
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop:100,
    alignItems:'center',
  },
  heading:{
    fontSize:40,
    paddingBottom: 100
  },
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
  inputContainer:{
    marginLeft:30,
    marginRight:30

  },
  input:{
    height: 50,
    padding:4,
    fontSize:18,
    borderWidth:1,
    borderColor: '#48bbec',

  },
  buttonText:{
    fontSize:22,
    color:'#FFF',
    alignSelf:'center',
    justifyContent:'center'
  },
});
