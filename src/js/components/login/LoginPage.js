import React from 'react';
import{View,Text, TextInput, StyleSheet, TouchableHighlight,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux'
import SocialAuth from 'react-native-social-auth';
import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {connect}  from 'react-redux';
import * as loginActions  from '../../actions/loginActions';
import * as loadingActions from '../../actions/loadingActions';
import UserNameInput from './UserNameInput';
import LoginButtons from './LoginButtons';
import LoadingOverlay from '../common/loading';
class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {loginStage:true}
    this.chooseProvider = this.chooseProvider.bind(this);
    this.loginTwitter = this.loginTwitter.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  chooseProvider(provider){
    this.setState({provider});
    this.setState({loginStage:false})

  }

  alertError(err){
    console.log(err);
  }

  loginTwitter(userName){
    SocialAuth.getTwitterSystemAccounts()
    .then((accounts) => {
      console.log(accounts)
      return SocialAuth.getTwitterCredentials(accounts[0].userName)
    })
    .then((credentials) => {
      credentials.userName = userName;
      this.setState({credentials});
      const credential = firebase.auth.TwitterAuthProvider.credential(credentials.oauthToken, credentials.oauthTokenSecret);
      this.loginCreateSaveUser(credential,userName)//this.props.actions.loginUser(credential, username);
    })
    .catch(this.alertError)
  }

  loginFacebook(userName){
    SocialAuth.setFacebookApp({id:'1261655493853815', name:'KTB Game Picker 2016'});
    SocialAuth.getFacebookCredentials(['email','public_profile'], SocialAuth.facebookPermissionsType.read)
    .then( (credentials) => {
      credentials.userName = userName;
      this.setState({credentials});
      const credential = firebase.auth.FacebookAuthProvider.credential(credentials.accessToken);
      this.loginCreateSaveUser(credential,userName)//this.props.actions.loginUser(credential,userName);
    })
    .catch(this.alertError)
  }

  loginCreateSaveUser(credential, userName){
    this.props.actions.loginUser(credential,userName).then(() => {
      return this.props.actions.saveUser(userName)
    })
    .then((id) => {
      let {credentials} = this.state;
      credentials.id = id;
      credentials.provider = this.state.provider;
      return AsyncStorage.setItem('credentials', JSON.stringify(this.state.credentials))
    })
    .then(() => {
      this.props.loadingActions.hideLoading();
      Actions.home();
    })
    .catch(this.alertError)
  }

  saveUser(userName){
    this.props.loadingActions.showLoading();
    if (this.state.provider == 'twitter') {
      this.loginTwitter(userName);
    }
    else{
      this.loginFacebook(userName)
    }
  }
  render(){
    return(
      <View>
        <View style = {styles.container}>
          <Text style = {styles.heading}>KTB Pickeroo</Text>
        </View>
        <View>
          {this.state.loginStage ?
                <LoginButtons chooseProvider={this.chooseProvider}/>
              : <UserNameInput next={this.saveUser}/>}
        </View>
        {this.props.loading && <LoadingOverlay/> }
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
    actions: bindActionCreators(loginActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch)
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
