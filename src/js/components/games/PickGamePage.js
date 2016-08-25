import React from 'react';
import{
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Team from './Team';
import {bindActionCreators} from 'redux';
import * as selectActions from '../../actions/gameActions';
class PickGamePage extends React.Component{
  constructor(props){
    super(props);
    this.savePick = this.savePick.bind(this);
    this.addPick = this.addPick.bind(this);
    this.state = {game:Object.assign({}, props.game)};
  }

  addPick(game, array){
    if (!game[array]) {
      game[array] = [];
    }
    game[array].push(this.props.user.userName);

  }
  removePick(game,array){
    if (!game[array]) {
      return game[array] =[];
    }
    const userIndex = game[array].indexOf(this.props.user.userName);
    if (userIndex >= 0) {
      game[array].splice(userIndex,1);
    }

  }

  savePick(teamName){
    if (teamName == this.state.game.awayTeam) {
      this.addPick(this.state.game, 'pickedAwayTeam')
      this.removePick(this.state.game,'pickedHomeTeam');
    }
    else{
      this.addPick(this.state.game, 'pickedHomeTeam')
      this.removePick(this.state.game,'pickedAwayTeam');
    }
    this.state.game.pick = teamName;
    this.props.actions.savePick(this.state.game, this.props.user.id, teamName );
  }

  render(){
    return(
      <View style = {styles.container}>
        <Team teamName={this.props.game.awayTeam} savePick={this.savePick} userName = {this.props.user.userName} picks = {this.props.game.pickedAwayTeam}/>
        <Text style = {{fontSize:60, padding:10, top:10}}>@</Text>
        <Team teamName={this.props.game.homeTeam} savePick={this.savePick} userName = {this.props.user.userName} picks = {this.props.game.pickedHomeTeam}/>
      </View>
    )
  }
}

function getGameById(games, id) {
  const game = games.filter( (game) => {
    return game.id === id;
  });
  if(game.length) {
    return game[0];
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const game = getGameById(state.games, ownProps.id);
  return {
    game,
    user: state.user
  };
}
function mapActionsToProps(dispatch){
  return {actions: bindActionCreators(selectActions,dispatch)};
}
export default connect(mapStateToProps, mapActionsToProps)(PickGamePage);

const styles = StyleSheet.create({
    container: {
      top:75,
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'flex-start',
  },
});
