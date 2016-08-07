import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';
export default Week = ({week}) => {
  return(
    <TouchableHighlight
        onPress={()=>Actions.games({week:week.week})}
        underlayColor = '#ddd'>
        <View style ={styles.row}>
          <Text style={{fontSize:18}}>Week {week.week}</Text>
          <View style ={styles.rowText}>
             <Text style ={styles.dateText}>{week.date}</Text>
           </View>
         </View>
      </TouchableHighlight>
  )
}

var styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection:'row',
    padding:18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  dateText:{
    fontSize:15,
    color:'#b5b5b5',
    textAlign:'right'
  },
  rowText:{
    flex:1,
  }
});
