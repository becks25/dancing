app.controller('DragAndDropCtrl', function ($scope, DraggedFactory) {
  //  var dragImage = document.createElement('img');
  // dragImage.src = 'http://simpleicon.com/wp-content/uploads/Shopping-Cart-12-128x128.png';
    $scope.handleDragStart = function (e) {
        DraggedFactory.dragged=this;
        this.style.opacity = '0.4';
    };
    $scope.handleDragEnd = function (e) {
        this.style.opacity = '1.0';
    };
    $scope.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var product = e.dataTransfer.getData('text/html').split(">")[1];
        var draggedElem = angular.element(DraggedFactory.dragged);
        console.log(e);
     //   console.log(angular.element(document.querySelector()));
        var left = e.pageX/2;
        var top = e.pageY/2;

      //  $scope.iframeHeight = document.querySelector(document);
        console.log(angular.element(window).prop('outerHeight'));

        console.log(draggedElem);
        console.log('want', e.pageY);
        draggedElem.css('left', left + 'px');
        draggedElem.css('top', top + 'px');

        // angular.element(DraggedFactory.dragged).css('left', e.x+'px');
        // angular.element(DraggedFactory.dragged).css('top', e.y+'px');
        console.log(DraggedFactory.dragged);

        this.style.transform = 'scale(1.0)';
    };
    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

        return false;
    };
    $scope.handleDragLeave = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    };
});