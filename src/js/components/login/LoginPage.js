import React from 'react';
import{View, Text, TextInput, StyleSheet, TouchableHighlight,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux'
import SocialAuth from 'react-native-social-auth';
import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {connect}  from 'react-redux';
import * as loginActions  from '../../actions/loginActions';
import UserNameInput from './UserNameInput';
import LoginButtons from './LoginButtons';

class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {loginStage:true}
    this.loginTwitter = this.loginTwitter.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  loginTwitter(){
    SocialAuth.getTwitterSystemAccounts()
    .then((accounts) => {
      console.log(accounts)
      return SocialAuth.getTwitterCredentials(accounts[0].userName)
    })
    .then((credentials) => {
      credentials.provider = 'twitter';
      this.setState({credentials});
      const credential = firebase.auth.TwitterAuthProvider.credential(credentials.oauthToken, credentials.oauthTokenSecret);
      return this.props.actions.loginUser(credential);
    })
    .then(() => {
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
      credentials.provider = "facebook";
      this.setState({credentials});
      const credential = firebase.auth.FacebookAuthProvider.credential(credentials.accessToken);
      return this.props.actions.loginUser(credential);
    })
    .then(() => {
      this.setState({loginStage:false})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  saveUser(userName){
    let {credentials} = this.state;
    credentials.userName = userName;
    this.props.actions.setUserName(userName);
    AsyncStorage.setItem('credentials', JSON.stringify(credentials)).then(()=>{Actions.home()}).catch( (er) => {
      console.error(er);
    });
  }
  render(){
    return(
      <View>
        <View style = {styles.container}>
          <Text style = {styles.heading}>KTB Pickeroo</Text>
        </View>
        <View>
          {this.props.loading && <Text>LOADING</Text>}
          {this.state.loginStage ?
                <LoginButtons loginFacebook={this.loginFacebook} loginTwitter={this.loginTwitter}/>
              : <UserNameInput next={this.saveUser}/>}
        </View>
      </View>

    )
  }
}
function mapStateToProps(state) {
  return{
    user: state.user,
    loading: state.loading
  };
}
function mapActionsToProps(dispatch) {
  return{
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default connect(mapStateToProps, mapActionsToProps)(LoginPage);

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
