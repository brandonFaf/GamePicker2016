import * as types from '../actions/actionTypes.js';

export default function yearlyReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_YEARLY_SUCCESS:
      return action.picks;
    case types.SAVE_YEARLY:
      var pick = {}
      pick[action.game.id] = action.teamName
      return Object.assign({}, state, pick)
    default:
      return state;
  }
}