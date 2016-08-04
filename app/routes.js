var User = require('./model/user');

module.exports = function(app){
  app.route('/api/users')
    .get(function(req, res){
      // 过滤自己
      var u = User.find({});
      var pageSize = parseInt(req.query.pageSize);
      var start = (req.query.pageIndex - 1) * pageSize;
      u.skip(start);
      u.limit(pageSize);
      // u.sort({'post_date','asc'}); //排序
      // 根据关键字查询后分页
      // u.where('title','XXX');
      u.exec(function(err, users){
        if (err) {
          res.json({status: 1, message: err});
        } else {
          res.json({status: 0, data: users});
        }
      });
    })
    .post(function(req, res){
      var user = new User();
      user.name = req.body.name;
      user.coverurl = req.body.coverurl;

      user.save(function(err){
        if (err) {
          res.json({status: 1, message: err});
        }else{
          res.json({status: 0, message: 'User create!'});
        }
      });
    })
    .put(function(req, res){
      // update user info
      var userId = req.body._id;
      User.findOne({_id: userId}, function(err, user){
        if (err) {
          res.send(err);
        }else{
          var votes = (user.votes += 1);
          user.save(function(err){
            if (err) {
              res.json({status: 1, message: err});
            }else{
              res.json({status: 0, data: { votes: votes}, message: 'vote success!'});
            }
          });
        }
      });
    });
};
