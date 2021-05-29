const users = [];

//joining new user
function userJoin(id,username,room){
    const user = {id,username,room};
    users.push(user);

    return user;
}

//get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

//get room name and users in the room
function getRoomUsers(room){
    return users.filter(user=> user.room === room);
}

//user leave the room
function userLeave(id){
    const index = users.findIndex(user=> user.id === id);

    if(index != -1){
        return users.splice(index,1)[0];
    }
}


module.exports ={
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave
};