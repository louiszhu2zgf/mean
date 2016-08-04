meanApp.controller('RegisterCharacter', ['$scope', 'User', '$timeout', '$location', function ($scope, User, $timeout, $location){
  $scope.invalidUsername = false;
  $scope.invalidUsernameForm = false;
  $scope.invalidCoverUrl = false;
  $scope.invalidCoverUrlForm = false;
  $scope.isloading = false;
  $scope.saveSuccess = false;
  $scope.saveError = false;

  // 检查用户名字段
  $scope.checkUsername = function(_name){
    if (!_name || _name == '' || _name.replace(/(^\s*) | (\s*$)/, '') == '') {
      $scope.invalidUsername = true;
      $timeout(function () {
        $scope.invalidUsername = false;
      }, 500);
      $scope.invalidUsernameForm = true;
      return false;
    }else{
      $scope.invalidUsernameForm = false;
      return true;
    }
  };

  // 检查封面url
  $scope.checkCoverUrl = function(_url){
    if (!_url || _url == "" || !(/http(s)?:/).test(_url)) {
      $scope.invalidCoverUrl = true;
      $timeout(function () {
        $scope.invalidCoverUrl = false;
      }, 500);
      $scope.invalidCoverUrlForm = true;
      return false;
    }else{
      $scope.invalidCoverUrlForm = false;
      return true;
    }
  };

  $scope.addCharacter = function(){
    var _username = $scope.userName;
    var _coverurl = $scope.userCoverUrl;
    if (!$scope.checkUsername(_username)) {
      return;
    }

    if (!$scope.checkCoverUrl(_coverurl)) {
      return;
    }

    var result = {
      name: _username,
      coverurl: _coverurl,
      votes: 0
    };

    $scope.saveSuccess = false;
    $scope.saveError = false;
    $scope.isloading = true;

    User.create(result)
      .success(function(data){
        if (data.status == 0) {
          $scope.saveSuccess = true;
          // reset status
          $timeout(function(){
            $location.path('/');
          }, 1000);
        }else{
          $scope.saveError = true;
        }
        $scope.isloading = false;
      })
      .error(function(err){
        $scope.isloading = false;
        $scope.saveError = true;
      });
  };
}]);
