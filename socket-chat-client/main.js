const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('User', socket.id, 'has connected.');
  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
  socket.on('chat message', (msg, room) => {
    if (room === '') {
      io.emit('chat message', msg);
    } else {
      io.to(room).emit('chat message', msg);
    }
    // socket.broadcast.emit('chat message', msg);
  });
  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
