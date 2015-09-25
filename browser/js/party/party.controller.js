app.controller('partyCtrl', function ($scope, dancers) {

  $scope.dancers = dancers;
  $scope.windowHeight = angular.element(window).prop('outerHeight') + 'px';
});