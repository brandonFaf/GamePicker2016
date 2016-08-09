import * as actions from './actionTypes';
export function savePick(game, teamName) {
  return {type:actions.SAVE_PICK, game, teamName}
}
