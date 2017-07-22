var db = require('./config.js');
var mongoose = require('mongoose');

//attributes
var userSchema = new mongoose.Schema( {
  key: String,
  firstName: String,
  lastName: String,
  childAge: Number,
  state: Number,
  amount: Number
} );

var stateSchema = new mongoose.Schema( {
  key: Number,
  title: String,
  bonds: Number,
  equities: Number,
  meta: String
});

var User = mongoose.model('User', userSchema);
var State = mongoose.model('State', stateSchema);

module.exports = {
  user: User,
  state: State
}
