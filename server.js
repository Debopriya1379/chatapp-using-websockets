const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
// const { message } = require('statuses');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const bot = 'letsChat bot';

io.on('connection', socket => {
    console.log('New User Connected');

    //Welcome new user
    socket.emit('message', formatMessage(bot,'welcome to letsChat'));

    //broadcast when a new user connects
    socket.broadcast.emit('message',formatMessage(bot,'A new user has joined the chat'));

    //listen to chatMessage
    socket.on('chatMessage', (msg) => {
        // console.log(msg);
        io.emit('message',formatMessage('User', msg));
    })

    //runs when user disconnects
    socket.on('disconnect', () => {
        console.log('A user has left');
        io.emit('message', formatMessage(bot,'A user has left the chat'));
    })
});


const port = 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});