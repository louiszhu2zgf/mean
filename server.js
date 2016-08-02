var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var router = express.Router();

var db = require('./config/db');

var port = process.env.PORT || 8080;

var User = require('./app/model/user');

mongoose.connect(db.url);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + './build'));

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
router.route('/users')
  .get(function(req, res){
    User.find(function(err, users){
      if (err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  })
  .post(function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.coverurl = req.body.coverurl;
    user.votes = req.body.votes;

    user.save(function(err){
      if (err) {
        res.send(err);
      }else{
        res.json({status: 0, message: 'User create!'});
      }
    })
  });
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;
