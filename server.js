const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { 
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const bot = 'letsChat bot';

io.on('connection', socket => {

    socket.on('joinRoom',({username,room})=>{

        const user = userJoin(socket.id,username,room);

        socket.join(user.room);

        //Welcome new user
        socket.emit('message', formatMessage(bot,'welcome to letsChat'));
    
        //broadcast when a new user connects
        socket.broadcast.to(user.room).emit('message',formatMessage(bot,`${user.username} has joined the chat`));
        
        console.log(`${user.username} has joined in the room ${room}`);
        
        //sending user and room info.
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users : getRoomUsers(user.room)
        });
    });
   
    //listen to chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        // console.log(msg);
        io.to(user.room).emit('message',formatMessage(user.username, msg));
    })

    //runs when user disconnects
    socket.on('disconnect', () => {

        const user = userLeave(socket.id);

        if(user){
            console.log(`${user.username} has left from the room ${user.room}`);
            io.to(user.room).emit('message', formatMessage(bot,`${user.username} has left the chat`));   
        }

        //sending user and room info.
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users : getRoomUsers(user.room)        
        });
    })
});


const port = 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});