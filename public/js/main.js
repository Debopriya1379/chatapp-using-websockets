const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('chat-message');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix : true,
});

const socket =io();

//joining new user to room
socket.emit('joinRoom',{username,room});

//get room name and users in the room
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});

//message from server
socket.on('message', msg=>{
    console.log(msg);
    outputMessage(msg);

    chatMessage.scrollTop=chatMessage.scrollHeight;
});

//sub,it message
chatForm.addEventListener('submit', e=>{
    e.preventDefault();

    //getting message text
    const msg = e.target.elements.msg.value;

    //emit message text to server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

//output message to dom
function outputMessage(msg){
    const div = document.createElement('div');
    // div.classList.add('message');
    div.innerHTML=`<p>${msg.username}<span>${msg.time}</span></p>
    <p>${msg.text}</p>`
    document.querySelector('.chat-message').appendChild(div);
}

//output roomname to dom
function outputRoomName(room){
    roomName.innerHTML=room;
};

//output users to dom
function outputUsers(users){
    userList=innerHTML='';
    users.forEach((user)=>{
        const li = document.createElement('li');
        li.innerText=user.username;
        userList.appendChild(li);
    });
};

//promt user before leave room
document.getElementById('leave-btn').addEventListener('click',()=>{
    const leaveRoom = confirm('Are you sure you wantto leave the chat room');
    if(leaveRoom){
        window.location='../index.html';
    }else{
    }
});