const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const {formatMessage}= require('./utils/message')
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users')
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Initialize Socket.io
const io = socketio(server);
const botName="ChatBot"
// Listen for new connections
io.on('connection', socket => {

    socket.on('joinRoom',(username,room)=>{
       console.log('New connection established');
       const user= userJoin(socket.id,username,room)
       socket.join(user.room)
       io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
       })
       socket.emit('message',formatMessage(botName,'welcome to chat'));
    //    alert(user.username)
    //    console.log(user,'*******')
       socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has entered the chat`))

    
    

    })
    
    
    socket.on('chatMsg',msg=>{
        const user= getCurrentUser(socket.id)
        socket.broadcast.to(user.room).emit('message',formatMessage(user.username,msg))
        let sentByme=true;
        socket.emit('message',formatMessage('You',msg,sentByme))
    })
    socket.on('disconnect',()=>{
        const user= userLeave(socket.id)
        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            })
        }
        
        
    })
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
server.listen(PORT, () => {
    console.log('Server is listening successfully on port', PORT);
});
