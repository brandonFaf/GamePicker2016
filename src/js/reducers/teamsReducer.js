import * as types from '../actions/actionTypes.js';

export default function teamsReducer(state = {}, action) {
 switch (action.type) {
   case types.LOAD_RECORDS_SUCCESS:
     return action.teams;
  case types.SAVE_YEARLY:{
    let winningResults = Object.assign([],state[action.winningTeam]) ;
    let losingResults = Object.assign([],state[action.losingTeam]) ;
    winningResults[action.game.week] = true;
    losingResults[action.game.week] = false;
    let newState = Object.assign({}, state);
    let newResults = {};
    newResults[action.winningTeam] = winningResults;
    newResults[action.losingTeam] = losingResults;
    return Object.assign(newState,newResults);
  }
   default:
     return state;
 }
}
