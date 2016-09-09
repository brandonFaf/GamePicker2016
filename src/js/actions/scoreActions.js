import firebase from 'firebase';
//Offline
// import GameAPI from '../../data/OfflineGameAPI';
// import UserAPI from '../../data/OfflineUserAPI';
//Firebase
import GameAPI from '../../data/FirebaseGameAPI';
import UserAPI from '../../data/FirebaseUserAPI';

export default function getUsersAndWinners() {
  return new Promise( (resolve, reject)=> {
    let picks;
    let winners;
    let users;
    GameAPI.loadPicks().then((snapshot) => {
      picks = snapshot.val();
      return GameAPI.loadWinners();
    }).then((winnerSnap) => {
      winners = winnerSnap.val();
      return UserAPI.loadAllUsers();
    }).then((userSnap)=>{
      users = userSnap.val();
      return GameAPI.loadYearPicks();
    }).then((yearSnap) => {
      const yearlyPicks = yearSnap.val();
      const uids = Object.keys(users)
      let scoresWeekly = uids.map((uid,i) => {
        let score;
        if (!winners) {
          score = users[uid].userName=="SI"? -1: 0;
        }
        else{
           score =  winners.reduce((total, cur, index) => {
            return cur == picks[uid][index]? ++total: total
          },0)
        }

        return {userName:users[uid].userName,score};
      });
      let scoresYearly = uids.map((uid,i) => {
        if (yearlyPicks[uid]) {
          let score;
          if(!winners){
            score =0;
          }
          else {
            score =  winners.reduce((total, cur, index) => {
              return cur == yearlyPicks[uid][index]? ++total:total
            },0)
          }

          return {userName:users[uid].userName,score};
        }
        return;
      });
      scoresWeekly = scoresWeekly.sort( (a,b) => {
        return b.score - a.score;
      });
      scoresYearly = scoresYearly.sort( (a,b) => {
        return b.score - a.score;
      });
      resolve({scoresWeekly, scoresYearly});
    }).catch((err) =>{
      reject(err);
    });
  });
}
