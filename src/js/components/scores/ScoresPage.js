import React from 'react';
import{View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import getScores from '../../actions/scoreActions'
import LoadingOverlay from '../common/loading'
export default class ScoresPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {scores:[], loading:true}
    getScores().then((scores) => {
      this.setState({scores, loading:!this.state.loading});
    })
  }


  render(){
    return(
      <View>
      <View style = {styles.container}>
        <Text style = {styles.title}>Leaderboard</Text>
        {this.state.scores.map(function(n,i,){
          return <View style = {styles.textView}key = {n.userName} ><Text  style = {styles.text}>{i+1}. {n.userName}: {n.score}</Text></View>
        })}
      </View>
         {this.state.loading && <LoadingOverlay/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      top:60,
    },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
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
