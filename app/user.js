var db = require('../config/db.js');
var Sequelize = require('sequelize');
var bcrypt   = require('bcrypt-nodejs');
var User = db.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});
User.sync();
module.exports = User;
