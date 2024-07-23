const socket= io()

const chatform = document.getElementById('chat-form')
const chatMessages=   document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const usertitle = document.getElementById('userName');
const container= document.querySelector('.chat-container')
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
let passCodes={
    AiQod:"AiQod@d6",
    Kabab:"Kabab@b6",
    SecretChat:"Secrett10Chat@",
    RIPCHAT:"RIPCHAT@T&",
    GuestROOM:"GuestROOM@M9",
    ExtraChat:"ExtraChat@t9"
}
const pass= prompt(`Enter passcode for ${room} Room! `)
if(pass!==(passCodes[room])){
    window.location = '../index.html';
    alert('Wrong password entered! ')
}else{

    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        console.log("This browser does not support desktop notification");
    }
       else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission()
      }
    container.style.display='block'
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
    if (document.hidden && Notification.permission === "granted") {
        const options = {
            body: `${msg.text}`,
            data: {
              status: "open",
            },
            icon:'../assets/icons8-woozy-face-94.png'
          };
          console.log(msg)
          const n = new Notification(`${msg.username}@ ${msg.room}`, options);
        // new Notification('ChatRooms',options);
      }
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
}