var User = require('./model/user');

module.exports = function(app){
  app.route('/api/users')
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
};
