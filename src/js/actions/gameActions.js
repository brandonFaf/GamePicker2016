import * as types from './actionTypes';
import GameAPI from '../../data/GameAPI';
import firebase from 'firebase';

function loadGamesSuccess(games) {
  //TODO: return only the current week and week before and after
  console.log("here");
  return {type:types.LOAD_GAMES_SUCCESS, games}
}

function savePickSuccess(game) {
  //TODO: return only the current week and week before and after
  console.log("here");
  return {type:types.SAVE_PICK, game}
}

export function savePick(game) {
  return function (dispatch) {
    return GameAPI.savePick(game).then( (game) => {
      dispatch(savePickSuccess(game))
    }).catch( (err) => {
      throw err;
    })
  }
}

export function loadGames(){
  return function (dispatch) {
    return firebase.database().ref('games').once('value').then((games) => {
      dispatch(loadGamesSuccess(games.val()))
    }).catch( (err) => {
      throw(err);
    })
  }
}
