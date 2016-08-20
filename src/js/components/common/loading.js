import React from 'react';
import {View, Dimensions,ActivityIndicator,Text, StyleSheet} from 'react-native';

export default LoadingOverlay = () => {
  return(
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading</Text>
      <ActivityIndicator animating={true} color={'#FFF'} size={'large'}/>
    </View>
  )
}
const styles = StyleSheet.create({
  loading:{
    flex:1,
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor:'#2C323B',
    opacity:0.7,
    height: Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems:'center'
  },
  loadingText:{
    color:'#fff',
    fontSize:35,
    marginBottom:20,
    opacity:1
  },
})
