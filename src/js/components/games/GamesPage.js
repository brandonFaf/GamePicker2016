import React from 'react';
import{
  View,
  StyleSheet,
  ListView
} from 'react-native';
import {connect} from 'react-redux';
import GamesList from './GamesList';
class GamesPage extends React.Component{
  constructor(props){
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2,
      sectionHeaderHasChanged: (s1, s2) => s1 != s2
    });
  }
  render(){
    return(
      <View style = {[styles.container, this.props.adminActive && styles.adminActive, this.props.isYearly && styles.isYearly]}>
        <GamesList picks={this.props.picks} games={this.dataSource.cloneWithRowsAndSections(this.props.games)}/>
      </View>
    )
  }
}

function getGamesByWeek(games, week) {
  const gamesToDisplay = games.filter((game) => {
      return game.week == week;
  });
  let timeMap = {};
  gamesToDisplay.forEach((game) => {
      const key = game.day + " " + game.date + " " +game.time;
      if (!timeMap[key]) {
          timeMap[key] = []
      }
      timeMap[key].push(game);
  })
  return timeMap;
}

function mapStateToProps(state, ownProps) {
  const picks = state.user.isYearly?state.yearly:state.picks
  return {
    games:getGamesByWeek(state.games, ownProps.week),
    picks,
    adminActive:state.user.adminActive,
    isYearly:state.user.isYearly
  }
}
export default connect(mapStateToProps)(GamesPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    justifyContent: 'flex-start',
  },
  adminActive:{
    backgroundColor:'#aaa'
  },
  isYearly:{
    backgroundColor:'#415C77'
  }
});
