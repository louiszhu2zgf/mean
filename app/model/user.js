var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  coverurl: String,
  votes: {type: Number, default: 0},
  voters: {type: Array, default: []}
});

module.exports = mongoose.model('user', userSchema);
