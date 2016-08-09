import * as actions from '../actions/actionTypes.js';

export default function gamesReducer(state = [], action) {
  switch (action.type) {
    case actions.LOAD_GAMES_SUCCESS:
      return action.games;
    case actions.SAVE_PICK:
      return [...state.filter( (game) => {
        return game.id !== action.game.id;
      }), Object.assign({}, action.game)].sort( (a,b) => {
        return a.id > b.id;
      });
    default:
      return state;
  }
}
