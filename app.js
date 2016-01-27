var express = require('express');
    app = express();    
    spotify = require('./server/spotify.js');
    sc = require('./server/sc.js');


app.use(express.static('./client/app'));
app.use(express.static('./client/bower_components'));

app.use('/spotify', spotify);
app.use('/sc', sc);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/views/index.html')
})

app.get('/music', function (req, res) {
  res.sendFile(__dirname + '/client/views/music.html')
})



app.listen(3000)
console.log('music-fly running on port 3000');
