var meanApp = angular.module('meanApp', ['ngRoute']);

meanApp.config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      })
      .when('/register', {
        templateUrl: 'components/user/register/register.html',
        controller: 'RegisterCharacter'
      })
      .when('/login', {
        templateUrl: 'components/user/login/login.html',
        controller: 'loginController'
      })
      .when('/previewer', {
        templateUrl: 'components/previewer/previewer.html',
        controller: 'previewerController'
      })
      .when('/404', {
        templateUrl: 'components/404/404.html',
        controller: 'NotfoundController'
      })
      .otherwise('/404');
  }
)
