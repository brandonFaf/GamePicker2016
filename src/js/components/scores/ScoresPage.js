import React from 'react';
import{View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import getScores from '../../actions/scoreActions';
import LoadingOverlay from '../common/loading';
export default class ScoresPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {scores:[], yearScores:[], loading:true};
    getScores().then((scores) => {
      this.setState({scores:scores.scoresWeekly, yearScores:scores.scoresYearly, loading:!this.state.loading});
    });
  }

  render(){
    const {userName} = this.props;
    return(
      <View>
      <View style = {styles.container}>
        <Text style = {styles.title}>Leaderboard</Text>
        {this.state.scores.map(function(n,i,){
          return <View style = {styles.textView}key = {n.userName} ><Text  style = {[styles.text,n.userName == userName && styles.selected]}>{i+1}. {n.userName}: {n.score}</Text></View>;
        })}
      </View>
      <View style = {styles.differentContainer}>
        <Text style = {styles.title}>Year Picks</Text>
        {this.state.yearScores.map(function(n,i,){
          return n && <View style = {styles.textView}key = {n.userName} ><Text  style = {[styles.text,n.userName == userName && styles.selected]}>{i+1}. {n.userName}: {n.score}</Text></View>;
        })}
      </View>
         {this.state.loading && <LoadingOverlay/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      top:60,
    },
    differentContainer: {
      flex: 1,
      justifyContent: 'center',
      top:60,
      height:300,
    },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  selected:{
    fontWeight:'bold',
  },
  textView:{
    padding:8,
    borderBottomWidth:1,
    borderColor: '#d7d7d7',
  },
  text:{
    textAlign:'left',
    fontSize:20,
    margin:10,
  },
});
