var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  playlists: {
    songs: Object
  }
})

var User = mongoose.model('MusicUser', userSchema);

module.exports = User;