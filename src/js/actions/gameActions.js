import * as actions from './actionTypes';
import GameAPI from '../../data/GameAPI';

function loadGamesSuccess(games) {
  //TODO: return only the current week and week before and after
  console.log("here");
  return {type:actions.LOAD_GAMES_SUCCESS, games}
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
