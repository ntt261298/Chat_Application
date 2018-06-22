var db = require('../config/db.js');
var Sequelize = require('sequelize');
var publicMessages = db.define('publicMessages', {
  messages: Sequelize.STRING,
  from: Sequelize.STRING
})
publicMessages.sync();

module.exports = publicMessages;
