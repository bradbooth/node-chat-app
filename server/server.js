const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname + '/../public'); //Build a nice looking path
const PORT = process.env.PORT || 3000;
var app = express(); //Initialize express
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //The directory for express to use

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
  socket.broadcast.emit('newMessage', generateMessage('Server', 'New user has joined'));

  socket.on('createMessage', (data, callback) => {
    console.log('createMessage', data);
    io.emit('newMessage', generateMessage(data.from, data.text));
    callback('This is from the server');
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected.')
  })

});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
}); //Port to listen on
