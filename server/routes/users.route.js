var express = require('express');
var app = express();  
var userModel = require('../models/user.model.js');

app.get('/profile', function (req, res) {
  userModel.find({}).exec(function (err, users){
    if (err) {
      return res.send(err)
    }
    res.json(users)
  });
});

module.exports = app;