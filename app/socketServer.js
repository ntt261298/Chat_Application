var db = require('../config/db.js');
var Sequelize = require('sequelize');
var publicMessages = require('./publicMessages.js');
var privateMessages = require('./privateMessages.js');
module.exports = function(io){
  var listUsers = [];
  var allSockets = {

    // A storage object to hold the sockets
    sockets: {},

    // Adds a socket to the storage object so it can be located by name
    addSocket: function(socket, name) {
      this.sockets[name] = socket;
    },

    // Removes a socket from the storage object based on its name
    removeSocket: function(name) {
      if (this.sockets[name] !== undefined) {
        this.sockets[name] = null;
        delete this.sockets[name];
      }
    },

  // Returns a socket from the storage object based on its name
  // Throws an exception if the name is not valid
  getSocketByName: function(name) {
    if (this.sockets[name] !== undefined) {
      return this.sockets[name];
    } else {
      throw new Error("A socket with the name '"+name+"' does not exist");
    }
  }

};

  io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);
    publicMessages.findAll({raw: true}).then((arrMessage) => arrMessage.forEach(message => {
      socket.emit("serverSendPublicMsg", {from: message.from, msg: message.messages});
    }))
    socket.on("disconnect", data => {
      allSockets.removeSocket(socket.username);
      if(!listUsers) return;
      listUsers.splice(listUsers.indexOf(socket.username), 1);
      io.sockets.emit("serverSendListUser", listUsers);
      console.log("Disconnect: " + socket.id);
    })
    socket.on("clientSendUser", user => {
      allSockets.addSocket(socket, user);
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
    socket.on("newFrame", (from, partner, max) => {
      socket.max = max;
      var func = "push";
      // ID room is 1-2 for example
      socket.emit("listFrameChat", from, partner, func, max);
      allSockets.getSocketByName(partner).emit("listFrameChat", partner, from, func, max);
    })
    socket.on("closeFrame", (from, partner, max) => {
      var func = "close";
      // ID room is 1-2 for example
      socket.emit("listFrameChat", from, partner, func, max);
      if(allSockets.sockets[partner] != undefined)
        allSockets.getSocketByName(partner).emit("listFrameChat", partner, from, func, max);
    })
    socket.on("clientNeedMessage", (from, id) => {
      var partner = "";
      for(let i = (from.length + 1); i < id.length; i++){
        partner = partner + id[i];
      }
      var reverseID = partner + "-" + from;
      privateMessages.findAll({where: Sequelize.or({key: id}, {key: reverseID})}).then(arrMessage => arrMessage.forEach(message => {
        console.log(message.messages);
        socket.emit("serverSendPrivateMsg", message.from, message.to, message.messages, message.key);
        //allSockets.getSocketByName(to).emit("serverSendPrivateMsg", message);
      }));
    })
    socket.on("chatInbox", (from, to, id, newMessage) => {
      privateMessages.create({
        key: id,
        messages : newMessage,
        from: from,
        to: to
      })
      socket.emit("serverSendMsg", from, newMessage, id);
      console.log(newMessage);
      if(allSockets.sockets[to] != undefined)
        allSockets.getSocketByName(to).emit("receiveSendMsg", from, newMessage, to);
    })
    socket.on("fromQueue", (from, id, max) => {
      var func = "push";
      var partner = "";
      for(let i = (from.length + 1); i < id.length; i++){
        partner = partner + id[i];
      }
      socket.emit("listFrameChat", from, partner,func, max);
      if(allSockets.sockets[partner] != undefined)
        allSockets.getSocketByName(partner).emit("listFrameChat", partner, from, func, max);
    })
  })
}
