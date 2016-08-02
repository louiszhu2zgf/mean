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
}]);
