import React, {PropTypes} from 'react';
import{
  ListView,
} from 'react-native';

import WeekItem from './WeekItem';

export default WeeksList  =  ({weeks}) => {
  return(
    <ListView
      dataSource = {weeks}
      renderRow = {(week) => {
        return <WeekItem week={week}/>;
      }}
    />);
};
