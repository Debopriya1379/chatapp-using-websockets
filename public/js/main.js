const chatForm = document.getElementById('chat-form');

const socket =io();

//message from server
socket.on('message', msg=>{
    // console.log(msg);
    outputMessage(msg);
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
    div.innerHTML=`<p>Rik<span>10.23pm</span></p>
    <p>${msg}</p>`
    document.querySelector('.chat-message').appendChild(div);
}