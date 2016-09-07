export default class GameAPI{
  static loadGames(){
    return firebase.database().ref('games').once('value')
  }
  static savePick(updates){
    return firebase.database().ref().update(updates);
  }
  static loadUserPicks(userId){
    return firebase.database().ref(`picks/${userId}`).once('value')
  }
  static loadPicks(){
    return firebase.database().ref('picks').once('value')
  }
  static loadWinners(){
    return firebase.database().ref('winners').once('value')
  }
  static loadYearPicks(){
    return firebase.database().ref('yearly').once('value')
  }
}
