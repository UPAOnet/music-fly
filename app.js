var express = require('express');
    app = express();    
    spotify = require('./server/spotify.js');

app.use(express.static('./client/app'));
app.use(express.static('./client/bower_components'));

app.use('/spotify', spotify);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.get('/a', function (req, res) {
  res.sendFile(__dirname + '/client/views/music.html')
})



app.listen(3000)
console.log('music-fly running');
