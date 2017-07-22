var Models = require('../models/model.js');
// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');
var controller = {};
var State = Models.state;


controller.userInfo = function(req,res) {
  //Check database immediately
  var equityMock = Math.round(Math.random() * 100);
  var bondMock = 100 - equityMock;
  var mockModelData = [{
    percentage: equityMock,
    name: 'equities'
  },
  {
    percentage: bondMock,
    name: 'bonds'
  }];

  var modelDataTemplate = [{
    percentage: undefined,
    name: 'equities'
  },
  {
    percentage: undefined,
    name: 'bonds'
  }];

  State.find({key: req.body.userInfo.key}).exec( function(err, results) {
    var modelData = [];
    var data = {};

    if ( results.length > 0  === false ) {
      modelData = mockModelData
    } else {
      info = results[0];
      data.state = info.title;
      data.meta = info.meta;

      modelData = modelDataTemplate.map( function(assetObject) {
        assetObject.percentage = info[assetObject.name];
        return assetObject
      });

      console.log('db results are: ', modelData);
    }

    data.pieChartData = {
      values: [],
      labels: []
    }


    sortedModelData = modelData.sort( function(a,b) {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()

      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })


    sortedModelData.forEach( function(assetObject) {
      data.pieChartData.values.push(assetObject.percentage);
      data.pieChartData.labels.push(assetObject.name);
    });

    res.send(200, data )
  });
};

controller.setState = function(req,res) {
  var stateMockInfo = {
    key: 1,
    title: 'New York',
    bonds: 0.3,
    equities: 0.7,
    meta: 'available online-low cost-low contribution limits'
  }

  var stateInfo = stateMockInfo;

  State.find({key: stateInfo.key}).exec( function(err,result) {
    if (result.length > 0) {
      console.log('result already exists: ', result);
      res.send(200)
    } else {
      var state = new State(stateInfo);

      state.save( function(err,addition) {
        if(err) {
          console.log('error saving')
          res.send(200)
        } else {
          console.log('saved!')
          res.send(200)
        }
      });
    }
  });
};

module.exports = controller;
