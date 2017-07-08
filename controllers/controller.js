var Tuple = require('../models/model.js');
// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');


var controller = {};

controller.userInfo = function(req,res) {
  //Check database immediately
  Tuple.find({key: req.body.key, value: '2' }).exec( function(err,result) {
    if (err) {
      res.send(400, 'error')
    } else {
      //Do lots of complicated math and stuff

      res.send(200, {data: {} })
    }
  })
};

controller.setTuple = function(req,res) {

  var add = new Tuple({
    key: 1,
    value: 2
  });

  add.save(function(err,addition) {
    if(err) {
      console.log('error saving');
      res.send(400,err);
    } else {
      console.log('saved!')
      res.send(200,addition);
    }
  });
};

module.exports = controller;
