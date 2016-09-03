import data from "./nfl-pickeroo-2016-export"

export default class UserAPI{
  static loadAllUsers(){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve({val: ()=>Object.assign([],data.users)});
      }, 1000)
    })
  }
  static loadUser(uid){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve({val: ()=>Object.assign({},data.users[uid])});
      }, 1000)
    })
  }
}
