const chatForm = document.getElementById('chat-form');

const socket =io();

//message from server
socket.on('message', msg=>{
    console.log(msg);
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