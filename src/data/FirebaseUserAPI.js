export default class UserAPI{
  static loadAllUsers(){
    return firebase.database().ref('users').once('value')
  }
  static loadUser(uid){
    return firebase.database().ref(`users/${uid}`).once('value')
  }
}
