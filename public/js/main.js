const socket= io()

const chatform = document.getElementById('chat-form')
const chatMessages=   document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const usertitle = document.getElementById('userName');
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
usertitle.innerText=username
socket.emit('joinRoom',username,room)
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUserName(users);
   
})
socket.on('message',msg=>{
    
    outputMessage(msg)
    chatMessages.scrollTop=chatMessages.scrollHeight
    // console.log(msg)
})

chatform.addEventListener('submit',e=>{
    e.preventDefault()
    let msg= e.target.elements.msg.value;
    socket.emit('chatMsg',msg)
    e.target.elements.msg.value=""
    e.target.elements.msg.focus()
});

function outputMessage(msgObj){
    const div= document.createElement('div')
    if(msgObj.username=="ChatBot"){
        const p= document.createElement('p')
        p.classList.add("chatBot")
        p.innerHTML=`${msgObj.text} : ${msgObj.time}`
        chatMessages.appendChild(p)
        return
    }
    if(msgObj["sentByme"]){
        div.classList.add("CurrentUserMsg")
    }else{
        div.classList.add('message')
    }
    
    div.innerHTML=`<p class="meta">${msgObj.username} <span>${msgObj.time}</span></p>
						<p class="text">
							${msgObj.text}
						</p>`
    chatMessages.appendChild(div);
}
function outputRoomName(room){
    console.log(room,'*****room')
   roomName.innerText=room;
   
}
function outputUserName(users){
    userList.innerHTML = '';
    users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });
  