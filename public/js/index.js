var socket = io();

socket.on('connect', function (data) {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(data){
  console.log('newMessage', data);

  var li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`)

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'Client',
    text: jQuery('[name=message-input').val()
  }, function (res) {
    console.log(res);
  })
});
