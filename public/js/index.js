var socket = io();

socket.on('connect', function (data) {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(data){
  console.log('newMessage', data);
});
