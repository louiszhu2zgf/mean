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

  // User.create({name: 'abduzeedo', coverurl: 'http://abduzeedo.com//sites/default/files/originals/60e3a441104067.5798dda792d65.jpg', votes: 10})
  //   .success(function(data){
  //     console.log(111)
  //     console.log(data);
  //   })
  //   .error(function(err){
  //     console.log(222)
  //     console.log(err);
  //   });
}]);
