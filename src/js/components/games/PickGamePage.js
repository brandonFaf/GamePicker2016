import React from 'react';
import{View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
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

  isValid(game){
    const format = "MMMM D h:mm a";
    const now = moment(moment(), format);
    const gameTime = moment(game.date + " " + game.time, format);
    return now.isBefore(gameTime);
  }

  savePick(teamName){
    if(!this.isValid(this.state.game)){
      this.setState({error: "Oops You tried to make/change your pick too late"})
      return;
    };
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
    const {game,user,picks,loading} = this.props;
    return(
      <View style = {{flex:1,flexDirection:'column'}}>
         <View style = {{top:60, paddingBottom:60, paddingTop:15,alignItems:'center'}}>
         {this.state.error && <Text style= {styles.errorText}>{this.state.error}</Text>}
        </View>
        <View style = {styles.container}>
          <Team teamName={game.awayTeam} savePick={this.savePick} userName = {user.userName} picks = {game.pickedAwayTeam} selected={picks[game.id]==game.awayTeam}/>
          <Text style = {{fontSize:60, padding:10, top:10}}>@</Text>
          <Team teamName={game.homeTeam} savePick={this.savePick} userName = {user.userName} picks = {game.pickedHomeTeam} selected={picks[game.id]==game.homeTeam}/>
        </View>
        <View style={{flex:2}}>
        {loading && <ActivityIndicator animating={true} color={'#222'} size={'large'}/>}
        </View>
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
    user: state.user,
    picks: state.picks,
    loading:state.loading
  };
}
function mapActionsToProps(dispatch){
  return {actions: bindActionCreators(selectActions,dispatch)};
}
export default connect(mapStateToProps, mapActionsToProps)(PickGamePage);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'flex-start',
  },
  errorText:{
    borderWidth:1,
    margin:10,
    padding:5,
    borderRadius:10,
    color:'red',
    borderColor:'red'
  }
});
