meanApp.factory('User', ['$http', function($http){
  var host = 'http://localhost:8080';
  return {
    get: function(pageIndex){
      return $http.get(host +'/api/users?pageIndex='+ pageIndex);
    },
    create: function(data){
      return $http.post(host +'/api/users', data);
    },
    delete: function(id){
      return $http.delete(host +'/api/users', id);
    },
    update: function(data){
      return $http.put(host +'/api/users', data);
    }
  };
}]);
