const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
    console.log('New User Connected');
});

const port = 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});