'use strict';
var session = require('express-session');

var router = require('express').Router();
module.exports = router;
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var Dancers = mongoose.model('Dancers');


router.get('/', function(req, res, next){
  Dancers.find()
    .then(function(dancers){
      res.send(dancers);
    })
    .then(null, next);
});