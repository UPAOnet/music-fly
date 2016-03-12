var express = require('express');
var app = express();  
var userModel = require('../models/user.model.js');
var bodyParser = require('body-parser');
var textParser = bodyParser.text();
var parseJSON = bodyParser.json();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.post('/login', parseJSON, function (req, res) {

  var req = req.body;
  var user = req.userName;
  var password = req.password;

  userModel.findOne({
    name: user,
    password: password
  }).exec(function (err, currentUser) {
    console.log(currentUser)
    
    if (!currentUser) {
      res.status(401)
      return res.send();
    }
    if (!currentUser.password) {
      res.status(401)
      return res.send();
    }
    
    res.cookie('login', user);
    res.json({result: true});

  });
});

module.exports = app;