app.factory('DancersFactory', function ($http) {
  return {
    getDancers: function(){
      return $http.get('/api/dancers')
      .then(response => response.data);
    }
  };
});