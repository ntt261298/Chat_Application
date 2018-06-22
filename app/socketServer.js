var publicMessages = require('./publicMessages.js');
module.exports = function(io){
  var listUsers = [];
  io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);
    publicMessages.findAll({raw: true}).then((arrMessage) => arrMessage.forEach(message => {
      socket.emit("serverSendPublicMsg", {from: message.from, msg: message.messages});
    }))
    socket.on("disconnect", data => {
      if(!listUsers) return;
      listUsers.splice(listUsers.indexOf(socket.username), 1);
      io.sockets.emit("serverSendListUser", listUsers);
      console.log("Disconnect: " + socket.id);
    })
    socket.on("clientSendUser", user => {
      socket.username = user;
      if(listUsers.indexOf(user) < 0){
        listUsers.push(user);
      }
      io.sockets.emit('serverSendListUser', listUsers);
    });
    socket.on("chatToAll", (from, msg) => {
      publicMessages.create({
        messages : msg,
        from: from
      })
      io.sockets.emit("serverSendMessage", from, msg);
    });
  })
}
