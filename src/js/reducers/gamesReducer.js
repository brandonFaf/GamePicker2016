import * as actions from '../actions/actionTypes.js';

export default function gamesReducer(state = [], action) {
  switch (action.type) {
    case actions.LOAD_GAMES_SUCCESS:
      return action.games;
    default:
      return state;
  }
}
