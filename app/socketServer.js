module.exports = function(io){
  var listUsers = [];
  io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);
    socket.on("clientSendUser", user => {
      if(listUsers.indexOf(user) < 0){
        listUsers.push(user);
      }
      io.sockets.emit('serverSendListUser', listUsers);
    });
    socket.on("chatToAll", (from, msg) => {
      io.sockets.emit("serverSendMessage", from, msg);
    });
    socket.on("logout", from => {
      listUsers.splice(
        listUsers.indexOf(from), 1
      );
      io.sockets.emit("serverSendListUser", listUsers);
    })
  })
}
