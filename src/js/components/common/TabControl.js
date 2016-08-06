import React from 'react';
import{
  View,
  Text,
  StyleSheet,
  TabBarIOS
} from 'react-native';

import WeeksPage from '../picker/WeeksPage'

export default class TabControl extends React.Component{
  constructor(){
    super();
    this.state = {selectedTab: 'pick'};
  }
  render(){
    //define a variable that will be the results tab if the user is an admin and declare what the results tab would look like.
    var adminControls =
        <TabBarIOS.Item
          title = 'Enter Results'
          selected = {this.state.selectedTab == 'results'}
          onPress = {() => this.setState({selectedTab:'results'}) }>
          <WeeksPage/>
        </TabBarIOS.Item>;
    //declare what the component will look like.
    //define the tab bad and the 2 items that will be in the tab bar and what each will look like when selected
    //if scores is selected, show a Scores Component
    //if user isAdmin, adminControls will contain an react component and will be displayed with the other tabs
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title= 'Pick'
          selected = {this.state.selectedTab == 'pick'}
          onPress = {()=>this.setState({selectedTab: 'pick'})}>
          <WeeksPage/>
       </TabBarIOS.Item>
        <TabBarIOS.Item
          title = 'Scores'
          selected = {this.state.selectedTab == 'scores'}
          onPress = {()=>this.setState({selectedTab:'scores'})}>
          <View>
            <Text>here</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
