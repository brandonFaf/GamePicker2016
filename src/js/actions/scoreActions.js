import firebase from 'firebase'
//Offline
import GameAPI from '../../data/OfflineGameAPI';
import UserAPI from '../../data/OfflineUserAPI';
//Firebase
// import GameAPI from '../../data/FirebaseGameAPI';
// import UserAPI from '../../data/FirebaseUserAPI';
function fake1() {
  console.log(1);
}
function fake7() {
  console.log(1);
}
function fake6() {
  console.log(1);
}
function fake5() {
  console.log(1);
}
function fake4() {
  console.log(1);
}
function fake3() {
  console.log(1);
}
function fake2() {
  console.log(1);
}

export default function getUsersAndWinners() {
  return new Promise( (resolve, reject)=> {
    let picks;
    let winners;
    GameAPI.loadPicks().then((snapshot) => {
      picks = snapshot.val()
      return GameAPI.loadWinners();
    }).then((winnerSnap) => {
      winners = winnerSnap.val()
      return UserAPI.loadAllUsers()
    }).then((userSnap)=>{
      const users = userSnap.val();
      const uids = Object.keys(picks)
      let scores = uids.map((uid,i) => {
        const score =  winners.reduce((total, cur, index) => {
          return cur == picks[uid][index]? ++total: total
        },0)
        return {userName:users[uid].userName,score};
      })
      scores = scores.sort( (a,b) => {
        return b.score - a.score;
      })
      resolve(scores)
    }).catch((err) =>{
      reject(err)
    })
  })
}
