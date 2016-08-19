import {combineReducers} from 'redux';
import games from './gamesReducer';
import user from './UserReducer'
import loading from './loadingReducer'

export default rootReducer = combineReducers(
  {
    games,
    user,
    loading
  }
);
