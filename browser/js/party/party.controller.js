app.controller('partyCtrl', function ($scope, dancers) {

  $scope.dancers = dancers;
console.log('here');
  $scope.windowHeight = angular.element(window).prop('outerHeight') + 'px';
});