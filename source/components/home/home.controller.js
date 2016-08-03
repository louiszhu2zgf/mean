meanApp.controller('HomeController', ['$scope', 'User', function ($scope, User){
  $scope.msg = "hello from home page";
  $scope.loading = true;
  User.get()
    .success(function(data){
      $scope.characters = data
      $scope.loading = false;
    })
    .error(function(err){
      console.log(err);
      $scope.loading = false;
    });
  $scope.vote = function(udata){
    User.update(udata)
      .success(function(data){
        if (data.status == 0) {
          udata.votes = data.data.votes;
        }
      })
      .error(function(err){
        console.log('err');
      });
  };
}]);
