var db = require('../config/db.js');
var Sequelize = require('sequelize');
var privateMessages = db.define('privateMessages', {
  key : Sequelize.STRING,
  messages: Sequelize.STRING,
  from: Sequelize.STRING,
  to: Sequelize.STRING
})
privateMessages.sync();
module.exports = privateMessages;
