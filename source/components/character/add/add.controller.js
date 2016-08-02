meanApp.controller('AddCharacter', ['$scope', 'User', function ($scope, User){
  $scope.addCharacter = function(){
    var result = {
      name: $scope.userName,
      coverurl: $scope.userCoverUrl,
      votes: 0
    };

    User.create(result)
      .success(function(data){
        console.log(111)
        console.log(data);
      })
      .error(function(err){
        console.log(222)
        console.log(err);
      });
  };
}]);
