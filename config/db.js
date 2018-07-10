var Sequelize = require('sequelize');
var pg = require('pg');
var config = require('./dbURL.js');
var db = new Sequelize({
    database: 'dfgtf76u6b4iji',
    username:'tmfhqkwzddbsit',
    password:'760c0c78a4ba5b96489628371be15230f8af13851961eafc4f89de2b26da1e26',
    host:'ec2-23-21-201-255.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })

db.authenticate()
.then(() => console.log('Ket noi thanh cong'))
.catch(err =>  console.log(err.message))

module.exports = db;
