import * as types from './actionTypes';
//Offline
// import GameAPI from '../../data/OfflineGameAPI';
//Firebase
import GameAPI from '../../data/FirebaseGameAPI';
import firebase from 'firebase';
import {showLoading} from './loadingActions';
function loadGamesSuccess(games) {
  return {type:types.LOAD_GAMES_SUCCESS, games};
}
function savePickSuccess(game, teamName) {
  return {type:types.SAVE_PICK, game, teamName};
}
function saveWinnerSuccess(game) {
  return {type:types.SAVE_WINNER, game};
}
function saveYearlySuccess(game,teamName) {
  return {type:types.SAVE_YEARLY, game, teamName};
}
function loadPicksSuccess(picks) {
  return {type:types.LOAD_PICKS_SUCCESS, picks};
}
function loadYearlySuccess(picks) {
  return {type:types.LOAD_YEARLY_SUCCESS, picks};
}
export function loadGames(){
  return function (dispatch) {
    return GameAPI.loadGames().then((snapshot) => {
      //TODO: return only the current week and week before and after and get the other weeks later
      //A hacky way to do this would be to grab like 16*3 games around the current week. I'll grab extras though because of byes
      let keys = Object.keys(snapshot.val());
      //give the game an id based on the key it has. Have to do it with keys because might not always get an array back.
      let games = snapshot.val().map((n,i) => {
        return Object.assign(n,{id: keys[i]});
      });
      dispatch(loadGamesSuccess(games));
    }).catch( (err) => {
      throw(err);
    });
  };
}
export function savePick(game, teamName) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    let updates = {};
    const {user} = getState();
    if (user.adminActive) {
      updates[`winners/${game.id}`] = teamName;
    }
    else if (user.isYearly) {
      updates[`yearly/${user.id}/${game.id}`] =teamName;
    }
    else{
      updates[`picks/${user.id}/${game.id}`] = teamName;
    }
    updates[`games/${game.id}`] = game;
    return GameAPI.savePick(updates).then(() => {
      if (user.adminActive) {
        dispatch(saveWinnerSuccess(game));
      }
      else if (user.isYearly) {
        dispatch(saveYearlySuccess(game,teamName));
      }
      else{
        dispatch(savePickSuccess(game, teamName));
      }
    }).catch( (err) => {
      throw err;
    });
  };
}
export function loadPicks(userId) {
  return function(dispatch) {
    return GameAPI.loadUserPicks(userId).then((snapshot) => {
      if (snapshot.val()) {
        dispatch(loadPicksSuccess(snapshot.val()));
      }
    });
  };
}
export function loadYearly(userId) {
  return function(dispatch) {
    return firebase.database().ref(`yearly/${userId}`).once('value').then((snapshot) => {
      if (snapshot.val()) {
        dispatch(loadYearlySuccess(snapshot.val()));
      }
    });
  };
}
