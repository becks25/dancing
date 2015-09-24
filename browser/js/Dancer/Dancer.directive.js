app.directive('dancer', function ($compile) {
  return {
    restrict: 'E',
    scope: {
      dancer: "="
    },
    templateUrl: '/js/Dancer/dancer.html',
    link: function(scope, elem){
      elem.on('click dragend', function(){
        var newDancer = angular.copy(elem.children());
        newDancer.attr('draggable', '');
        $compile(angular.element(document.querySelector('.party')).append(newDancer))(scope);
      });
    }
  };
});