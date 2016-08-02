meanApp.directive('loadingSpinner', function (){
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'loading': '='
    },
    templateUrl: 'components/spinner/spinner.html'
  };
});
