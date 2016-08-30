import firebase from 'firebase'

export default function getUsersAndWinners() {
  return new Promise( (resolve, reject)=> {
    let picks;
    let winners;
    firebase.database().ref('picks').once('value').then((snapshot) => {
      picks = snapshot.val()
      return firebase.database().ref('winners').once('value')
    }).then((winnerSnap) => {
      winners = winnerSnap.val()
      return firebase.database().ref('users').once('value')
    }).then((userSnap)=>{
      const users = userSnap.val();
      const uids = Object.keys(picks)
      const scores = uids.map((uid,i) => {
        const score =  winners.reduce((total, cur, index) => {
          return cur == picks[uid][index]? ++total: total
        },0)
        return {userName:users[uid].userName,score};
      })
      resolve(scores)
    }).catch((err) =>{
      reject(err)
    })
  })
}
