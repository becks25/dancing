app.controller('ResizeCtrl', function ($scope) {

    // $scope.resize = function(evt,ui) {
    //   //console.log (evt,ui);
    //   $scope.w = ui.size.width;
    //   $scope.h = ui.size.height;
    // };

     console.log('resize');
     $scope.resize = false;
     var startX;
     var startY;

     $scope.toggleResizing = function(){
        console.log(this);
        angular.element(this).toggleClass('resizing');
        $scope.resize = !$scope.resize;
      }

      $scope.dragStart = function(e){
        if($scope.resize){

          //e.preventDefault();

          startY = e.pageY;
          startX = e.pageX;
        }
      };


    $scope.dragEnd = function(e){
      if($scope.resize){

      var selectedDancer = angular.element(this);
      var width = (e.pageX - startX) + this.width;
      var height = (e.pageY - startY) + this.height;
      selectedDancer.css('height', height + 'px');

      // selectedDancer.css('width', width + 'px');

        angular.element(this).removeClass('resizing');
        $scope.resize = false;

      }
    }

  });

