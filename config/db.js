var Sequelize = require('sequelize');
var pg = require('pg');
var url = "postgres://tmfhqkwzddbsit:760c0c78a4ba5b96489628371be15230f8af13851961eafc4f89de2b26da1e26@ec2-23-21-201-255.compute-1.amazonaws.com:5432/dfgtf76u6b4iji";
var db = new Sequelize({
  connectionString: process.env.url,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  operatorsAliases: false
})

db.authenticate()
.then(() => console.log('Ket noi thanh cong'))
.catch(err =>  console.log(err.message))

module.exports = db;
