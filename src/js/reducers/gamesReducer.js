import * as types from '../actions/actionTypes.js';

function sortById(games) {
  return games.sort( (a,b) => {
    return a.id - b.id;
  });
}

export default function gamesReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_GAMES_SUCCESS:
      return sortById(action.games);
    case types.SAVE_PICK:
      return sortById([...state.filter( (game) => {
        return game.id !== action.game.id;
      }), Object.assign({}, action.game)])
    default:
      return state;
  }
}
