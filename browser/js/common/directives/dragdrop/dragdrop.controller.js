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


        angular.element(DraggedFactory.dragged).css('left', e.clientX+'px');
        angular.element(DraggedFactory.dragged).css('top', e.layerY+'px');

        this.style.transform = 'scale(1.0)';
    };
    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        this.style.transform = 'scale(1.5)';
      this.style.transition = 'all .5s ease-in-out';
        return false;
    };
    $scope.handleDragLeave = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        this.style.transform = 'scale(1.0)';
        this.style.transition = '';
    };
});