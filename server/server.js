const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname + '/../public'); //Build a nice looking path
const PORT = process.env.PORT || 3000;
var app = express(); //Initialize express
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //The directory for express to use

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', {
    from: 'server',
    text: 'Welcome to the chat app'
  });

  socket.broadcast.emit('newMessage', {
    from: 'server',
    text: 'New user has joined.'
  })

  socket.on('createMessage', (data) => {
    console.log('createMessage', data);
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date()
    })

  // Send to everyone but this socket
  // socket.broadcast.emit('newMessage', {
  //       from: data.from,
  //       text: data.text,
  //       createdAt: new Date()
  //     });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected.')
  })

});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
}); //Port to listen on
