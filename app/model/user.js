var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  coverurl: String,
  votes: Number,
  voters: Array
});

module.exports = mongoose.model('user', userSchema);
