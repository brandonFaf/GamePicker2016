import {combineReducers} from 'redux';
import games from './gamesReducer';
import user from './UserReducer';
import loading from './loadingReducer';
import picks from './picksReducer';
import yearly from './yearlyReducer';
import yearlyRecords from './yearlyRecordsReducer';
import weeklyRecords from './weeklyRecordsReducer';
export default rootReducer = combineReducers(
  {
    games,
    user,
    loading,
    picks,
    yearly,
    yearlyRecords,
    weeklyRecords
  }
);
