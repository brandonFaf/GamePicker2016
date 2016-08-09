import * as actions from './actionTypes';
import GameAPI from '../../data/GameAPI';

function loadGamesSuccess(games) {
  //TODO: return only the current week and week before and after
  console.log("here");
  return {type:actions.LOAD_GAMES_SUCCESS, games}
}

function savePickSuccess(game) {
  //TODO: return only the current week and week before and after
  console.log("here");
  return {type:actions.SAVE_PICK, game}
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
    return GameAPI.loadGames().then((games) => {
      dispatch(loadGamesSuccess(games))
    }).catch( (err) => {
      throw(err);
    })
  }
}
