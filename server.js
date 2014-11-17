/**
 * Created by mazia_000 on 2014-08-26.
 */


var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/public';


var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.set('views', EXPRESS_ROOT);
app.use(express.static(EXPRESS_ROOT));
app.set('view engine', 'vash');
app.use(bodyParser.json())



require('./app/routes')(app);

app.use(require('connect-livereload')());

var db = require('./models');
db  .sequelize
    .sync()
    .complete(function(err) {
        app.listen(EXPRESS_PORT);
    });

exports = module.exports = app;
