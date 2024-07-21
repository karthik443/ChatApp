users= []

function userJoin(id,username,room){
  // console.log(id,username,room)
    const user = { id, username, room };
    users.push(user);
    console.log(users)
    return user;
}
function getCurrentUser(id){
    return users.find(user=>user.id==id)
}
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}
function getRoomUsers(room) {
  // console.log(users,room)
    return users.filter(user => user.room === room);
  }
  
  module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  };

