app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        link: function(scope){
          scope.title = true;
        }
    });
});