var Sequelize = require('sequelize');
var pg = require('pg');
var db = new Sequelize({
  database: 'myDB',
  username: 'postgres',
  password: '26121998',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
  operatorsAliases: false
})

db.authenticate()
.then(() => console.log('Ket noi thanh cong'))
.catch(err =>  console.log(err.message))

module.exports = db;
