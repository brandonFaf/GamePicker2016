export default class GameAPI{
  static loadGames(){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve(Object.assign([],games));
      }, 1000)
    });
  }
  static savePick(game, teamName){
    game = Object.assign({}, game);
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        const gameIndex = games.findIndex(g => g.id == game.id);
        games.splice(gameIndex, 1, game);
        resolve(game);
      }, 1000)
    })
  }
}

const games = [
  {
    id:1,
    homeTeam:"Ravens",
    awayTeam:"Steelers",
    time:1,
    week:1
  },
  {
    id:2,
    homeTeam:"Browns",
    awayTeam:"Bengals",
    time:1,
    week:1
  },
  {
    id:3,
    homeTeam:"Cowboys",
    awayTeam:"Eagles",
    time:4,
    week:1
  },
  {
    id:4,
    homeTeam:"Cardinals",
    awayTeam:"49ers",
    time:1,
    week:2
  },
  {
    id:5,
    homeTeam:"Giants",
    awayTeam:"Patriots",
    time:1,
    week:2
  },
  {
    id:6,
    homeTeam:"Colts",
    awayTeam:"Texans",
    time:4,
    week:2
  },
]
