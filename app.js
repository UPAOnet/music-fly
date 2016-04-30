var express = require('express');
var app = express();
var mongoose = require('mongoose');
var spotify = require('./server/spotify.js');
var users = require('./server/routes/users.route.js')

// mongoose.connect('mongodb://localhost/musicUsers');

app.use(express.static('./client/dev/public'));
app.use(express.static('./client/vendor'));
app.use(express.static('./client/bower_components'));

app.use('/users', users);
app.use('/spotify', spotify);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
})


var port = process.env.PORT || 3000;
app.listen(port);
console.log('music-fly running on ' + port);
