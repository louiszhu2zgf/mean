meanApp.controller('HomeController', ['$scope', 'User', function ($scope, User){
  $scope.msg = "hello from home page";
  $scope.loading = true;
  $scope.pageIndex = 1; // loading 6 items once request
  $scope.characters = [];
  $scope.isEmptyData = false;

  // 计算铺满当前屏幕需要多少个item
  var pageSize = Math.ceil((window.innerHeight - 30)/(window.innerWidth/3*0.75+30)) * 3;

  $scope.loadUsers = function(index){
    $scope.loading = true;
    User.get(index, pageSize)
      .success(function(ret){
        if (ret.status == 0) {
          if (ret.data.length == 0) {
            $scope.isEmptyData = true;
          }else{
            $scope.characters = $scope.characters.concat(ret.data);
          }
        }
        $scope.loading = false;
      })
      .error(function(err){
        console.log(err);
        $scope.loading = false;
      });
  };

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

  $scope.loadUsers($scope.pageIndex);

  angular.element(document).on('scroll', function(e){
    var shouldLoadMore = (document.body.clientHeight - window.innerHeight - document.body.scrollTop) < 100;
    if (shouldLoadMore && !$scope.loading && !$scope.isEmptyData) {
      $scope.loadUsers(++$scope.pageIndex);
    }
  })
}]);
