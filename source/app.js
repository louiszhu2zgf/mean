var meanApp = angular.module('meanApp', ['ngRoute']);

meanApp.config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      })
      .when('/404', {
        templateUrl: 'components/404/404.html',
        controller: 'NotfoundController'
      })
      .otherwise('/404');
  }
)
