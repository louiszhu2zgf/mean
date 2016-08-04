meanApp.factory('User', ['$http', function($http){
  var host = 'http://localhost:8080';
  return {
    get: function(pageIndex, pageSize){
      return $http.get(host +'/api/users?pageIndex='+ pageIndex +'&pageSize='+ pageSize);
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
