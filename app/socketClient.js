var socket = io.connect("http://localhost:8080/private");
socket.on('serverSendUser', () => {
  $("#users").add('<p id="1"><%= user.username %></p>')
})
$(document).ready(function(){
  $("#sendText").click(() => {
    socket.emit("chatToAll", $("#textContent").val());
  })
})
