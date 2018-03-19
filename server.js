var express = require('express');
var app = express();
var port = process.env.port || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(port);
