var express = require('express');
    app = express();    
    spotify = require('./server/spotify.js');

app.use(express.static('public'));
app.use(express.static('vendor'));
app.use('/spotify', spotify);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html')
})

app.get('/a', function (req, res) {
  res.sendFile(__dirname + '/public/views/music.html')
})



app.listen(3000)
console.log('music-fly running');
