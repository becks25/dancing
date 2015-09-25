app.controller('dancerCtrl', function ($scope) {
  $scope.dancers = [
    {
      danceName: 'The Carlton',
      dance: '/js/videos/carlton.gif'
    },
    {
      danceName: 'The Elaine',
      dance: '/js/videos/elaine.gif'
    },
    {
      danceName: 'Paul Rudd',
      dance: '/js/videos/paulrudd.gif'
    },
    {
      danceName: 'Spiderman',
      dance: '/js/videos/spiderman.gif'
    }
  ];
});