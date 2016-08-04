meanApp.directive('avatar', function (){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'components/avatar/avatar.html'
  };
});
