import * as types from './actionTypes';
import GameAPI from '../../data/GameAPI';
import firebase from 'firebase';

function loadGamesSuccess(games) {
  return {type:types.LOAD_GAMES_SUCCESS, games}
}

function savePickSuccess(game) {
  return {type:types.SAVE_PICK, game}
}

export function loadGames(){
  return function (dispatch) {
    return firebase.database().ref('games').once('value').then((snapshot) => {
      //TODO: return only the current week and week before and after and get the other weeks later
      //A hacky way to do this would be to grab like 16*3 games around the current week. I'll grab extras though because of byes
      let keys = Object.keys(snapshot.val());
      //give the game an id based on the key it has. Have to do it with keys because might not always get an array back.
      let games = snapshot.val().map((n,i) => {
        return Object.assign(n,{id: keys[i]});
      })
      dispatch(loadGamesSuccess(games))
    }).catch( (err) => {
      throw(err);
    })
  }
}

function loadPicks(userId) {
  return function(dispatch) {
    return firebase.database().ref(`users/${userId}/picks`).once('value').then((snapshot) => {
      dispatch(loadPicksSuccess(snapshot.val()));
    })
  }
}

export function savePick(game, userId, pick) {
  return function (dispatch) {
    const key = firebase.database().ref('picks').push().key;
    let updates = {};
    updates[`picks/${key}`] = {gameId: game.id, userId, pick};
    updates[`games/${game.id}`] = game;
    return firebase.database().ref().update(updates).then(() => {
      dispatch(savePickSuccess(game))
    }).catch( (err) => {
      throw err;
    })
  }
}
