var express = require('express');
var app = express();    
var spotify = require('./server/spotify.js');


app.use(express.static('./client/app'));
app.use(express.static('./client/vendor'));
app.use(express.static('./client/bower_components'));

app.use('/spotify', spotify);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/views/index.html')
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('music-fly running on' + port);
