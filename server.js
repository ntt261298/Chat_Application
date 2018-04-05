var express = require('express');
var http = require('http');
var app = express();
var pg = require('pg');
var passport = require('passport');
var bodyParser = require('body-parser');// lấy thông tin từ form người dùng
var cookieParser = require('cookie-parser');// sử dụng thông tin từ cookie
var session = require('express-session');
var flash = require('connect-flash');
var configDB = require('./config/db.js');
require('./config/passport')(passport);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
  secret: 'ntt261298',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);
app.listen(8080, () => console.log('Server da khoi dong tren port 8080'));
