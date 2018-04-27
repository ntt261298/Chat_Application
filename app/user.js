var db = require('../config/db.js');
var Sequelize = require('sequelize');
var bcrypt   = require('bcrypt-nodejs');
var User = db.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});
User.sync();
// User.findOne({where: {username: 'user1'}}).success((user) =>{
//   console.log('User is found');
// }).err((err) => {
//   console.log(err);
// })
User.destroy({where: {id: '6'}})


module.exports = User;
