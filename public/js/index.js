var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'BradClient',
    text: 'Hello from client'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(data){
  console.log('newMessage', data);
});
