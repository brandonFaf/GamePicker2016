# GamePicker 2016

### What is GamePicker 2016?

GamePicker 2016 is an iOS (and hopefully soon an Android app) created for picking winners of NFL games. Users pick the teams they think will win each week and can compare their scores with their friends to see who is the best at picking.

Right now there are two modes of picking:

  - Weekly picks - See how well you do week to week picking the winners of NFL games
  - Yearly picks - See how well you do picking the whole NFL season before it even starts

### How was GamePicker 2016 made?

GamePicker 2016 is a native iOS application written in ES6 Javascript using Facebook's [React Native](https://facebook.github.io/react-native/docs/getting-started.html). The application uses [Firebase](https://firebase.google.com/) to store data and for authentication. The Firebase Javascript API was used to communicate with the realtime database. The [React-Native-Social-Auth](https://github.com/xxsnakerxx/react-native-social-auth) was used to get OAuth credentials which then get passed to firebase using the same Javascript API. GamePicker 2016 sends updates to users using [CodePush](https://microsoft.github.io/code-push/), which helps push over the air updates to the JavaScript code.

### Features
- Login with Twitter or Facebook
- See other users picks
- See how you compare to other users
- See which picks you got correct
- Make your picks for the whole year in a separate section to see how well you do
- Can't enter or change a pick after a game has started


### Features  that are coming soon!
- Realtime updates using Firebase
- Survivor Picks - Pick a team each week you are sure will win, but you can't picks a team more than once
- Staging/Production environments for easier development and feature integration
- Stats for your percentage of correct picks
- Leagues for more people to use and use only with their friends
- Android support
