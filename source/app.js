var meanApp = angular.module('meanApp', ['ngRoute']);

meanApp.config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      })
      .when('/character/add', {
        templateUrl: 'components/character/add/add.html',
        controller: 'AddCharacter'
      })
      .when('/404', {
        templateUrl: 'components/404/404.html',
        controller: 'NotfoundController'
      })
      .otherwise('/404');
  }
)
