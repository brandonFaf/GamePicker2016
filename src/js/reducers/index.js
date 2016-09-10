import {combineReducers} from 'redux';
import games from './gamesReducer';
import user from './UserReducer';
import loading from './loadingReducer';
import picks from './picksReducer';
import yearly from './yearlyReducer';
import teams from './teamsReducer';

export default rootReducer = combineReducers(
  {
    games,
    user,
    loading,
    picks,
    yearly,
    teams
  }
);
