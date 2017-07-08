var db = require('./config.js');
var mongoose = require('mongoose');

//attributes
var userSchema = new mongoose.Schema( {
  key: String,
  firstName: String,
  lastName: String,
  state: Number,
  childAge: Number,
  plan: Number,
  amount: Number


} );

var User = mongoose.model('User', userSchema);

module.exports = User;
