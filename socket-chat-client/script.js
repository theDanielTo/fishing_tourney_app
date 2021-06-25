const socket = io("http://localhost:3000");
const $messages = document.querySelector('#message-container');
const $form = document.querySelector('#form');
const $messageInput = document.querySelector('#message-input');
const $roomInput = document.querySelector('#room-input');
const $joinRoomBtn = document.querySelector('#room-button');

$form.addEventListener('submit', e => {
  e.preventDefault();
  const message = $messageInput.value;
  const room = $roomInput.value;
  if ($messageInput.value) {
    socket.emit('chat message', message, room);
    $messageInput.value = '';
  }
});

$joinRoomBtn.addEventListener('click', e => {
  const room = $roomInput.value;
  socket.emit('join-room', room, message => {
    displayMessage(message);
  });
})

socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`);
})

socket.on('chat message', msg => {
  displayMessage(socket.id + ': ' + msg);
  window.scrollTo(0, document.body.scrollHeight);
});

function displayMessage(message) {
  var $item = document.createElement('div');
  $item.textContent = message;
  $messages.appendChild($item);
}
