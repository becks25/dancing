app.directive('resizable', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

		// elem.resizable();
        // elem.on('resize', function (evt, ui) {
        //   console.log('here');
        //   scope.$apply(function() {
        //     if (scope.callback) { 
        //       scope.callback({$evt: evt, $ui: ui }); 
        //     }                
        //   })
        // });
      // scope.resize = false;
      // scope.alwaysTrue = true;
      elem.on('click', scope.toggleResizing);



      elem[0].addEventListener('dragstart', scope.dragStart, false);
      elem[0].addEventListener('dragend', scope.dragEnd, false);

		        


   },
    controller: 'ResizeCtrl'
  };
});