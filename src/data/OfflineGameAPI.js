import data from "./nfl-pickeroo-2016-export"

export default class GameAPI{
  static loadGames(){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve({val: ()=>Object.assign([],data.games)});
      }, 1000)
    });
  }
  static loadWinners(){
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        resolve({val: ()=>Object.assign([],data.winners)})
      }, 1000)
    })
  }
  static savePick(updates){
    const keys = Object.keys(updates);
    keys.map((key) => {
      if (key.indexOf('winner')>=0) {
        return this.saveWinner(key, updates[key]);
      }
      if (key.indexOf('pick')>=0) {
        return this.saveUserPick(key, updates[key]);
      }
      if (key.indexOf('game')>=0) {
        return this.saveGame(key, updates[key])
      }
    })
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        resolve()
      },1000)
    });
  }
  static loadPicks(){
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        resolve({val: ()=>Object.assign([],data.picks)})
      }, 1000)
    })
  }
  static loadYearPicks(){
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        resolve({val: ()=>Object.assign([],data.yearly)})
      }, 1000)
    })
  }

  static saveWinner(key,winner) {
    const gameId = key.split('/')[1];
    let teamObj = {};
    teamObj[gameId] = winner
    data.winners = Object.assign({},data.winners,teamObj);
  }
  static saveUserPick(key,pick) {
    const [,userId,gameId] = key.split('/');
    let teamObj = {};
    teamObj[gameId] = pick
    data.picks[userId] = Object.assign({},data.picks[userId],teamObj);
  }
  static saveGame(key,game) {
    const gameId = key.split('/')[1];
    let gameObj = {};
    gameObj[gameId] = game;
    data.games = Object.assign({},data.games,gameObj)
  }
  static loadUserPicks(userId){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve({val:()=>Object.assign([],data.picks[userId])});
      }, 1000)
    });
  }
}
