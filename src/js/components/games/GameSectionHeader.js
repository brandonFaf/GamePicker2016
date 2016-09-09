import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default GameSectionHeader = ({sectionData, sectionID}) => {
  return (
      <View style={styles.section}>
          <Text style={styles.text}>{sectionID}</Text>
      </View>
  );
};
const styles = StyleSheet.create({
  section: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#4E8EF7'
    },
});
