import React from 'react';
import{
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

import WeeksList from './WeeksList';
import Weeks from '../../../data/weeks.js';
export default class WeeksPage extends React.Component{
  constructor(){
    super();
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
  }
  render(){
    return(
      <View style = {styles.container}>
        <WeeksList weeks={this.dataSource.cloneWithRows(Weeks)}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    justifyContent: 'flex-start',
  },
});
