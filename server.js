var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');// lấy thông tin từ form người dùng
var cookieParser = require('cookie-parser');// sử dụng thông tin từ cookie
var session = require('express-session');
var flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', './views');

require('./app/routes.js')(app, passport);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extend: true }));
app.use(passport.initialize());
app.use(session({secret: 'ntt261298'}));
app.use(passport.session());
app.use(flash());

app.listen(8080, () => console.log('Server da khoi dong tren port 8080'));
