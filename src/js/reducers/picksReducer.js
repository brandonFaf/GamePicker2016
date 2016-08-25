import * as types from '../actions/actionTypes.js';

export default function picksReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_PICKS_SUCCESS:
      return action.picks;
    case types.SAVE_PICK:
      var pick = {}
      pick[action.game.id] = action.pick
      return Object.assign({}, state, pick)
    default:
      return state;
  }
}
