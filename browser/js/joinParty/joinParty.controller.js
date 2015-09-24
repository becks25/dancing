app.controller('joinPartyCtrl', function ($scope) {
  // $scope.partyCam = {
  //   videoHeight: 300,
  //   videoWidth: 200,
  //   video:null
  // };

  var _video = null,
        patData = null;

    $scope.showDemos = false;
    $scope.edgeDetection = false;
    $scope.mono = false;
    $scope.invert = false;

    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.partyCam = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.partyCam.video;

        console.log($scope.partyCam.video);
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            $scope.showDemos = true;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
          console.log('streaming?');
          $scope.streaming = true;

        
    };


    var removeBackground = function(backgroundImage){
            var liveCanvas = document.querySelector('#live');
            if (!liveCanvas) return;

            liveCanvas.width = _video.width;
            liveCanvas.height = _video.height;
            var ctxLive = liveCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxLive.putImageData(idata, 0, 0);


              // ctxLive.drawImage(_video, 0, 0, _video.width, _video.height);
              // // var background_data = $scope.background.getImageData(0, 0, ctxLive.width, ctxLive.height);
              // var background_data = backgroundImage;
              // var frame = ctxLive.getImageData(0, 0, ctxLive.width, ctxLive.height);
              // var l = frame.data.length / 4;
              // console.log(frame);

              // for (var i = 0; i < l; i++) {
              //   var r = frame.data[i * 4 + 0];
              //   var g = frame.data[i * 4 + 1];
              //   var b = frame.data[i * 4 + 2];
              //   if (g > background_data.data[i*4+0] && r > background_data.data[i*4+1] && b < background_data.data[i*4+2])
              //     frame.data[i * 4 + 3] = 0;
              // }
              //ctxLive.putImageData(frame, 0, 0);
    };
    


    /**
     * Make a snapshot of the camera data and show it in another canvas.
     */
    $scope.makeSnapshot = function makeSnapshot() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;

            setTimeout(removeBackground(idata), 3000);
        }
    };


    var getVideoData = function(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.background = imgBase64;
    };


    // (function() {
    //   var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    //                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    //   window.requestAnimationFrame = requestAnimationFrame;
    // })();

    var start = Date.now();

    /**
     * Apply a simple edge detection filter.
     */
    // function applyEffects(timestamp) {
    //   var progress = timestamp - start;

    //   if (_video && $scope.edgeDetection) {
    //     var videoData = getVideoData(0, 0, _video.width, _video.height);

    //     var resCanvas = document.querySelector('#result');
    //     if (!resCanvas) return;

    //     resCanvas.width = _video.width;
    //     resCanvas.height = _video.height;
    //     var ctxRes = resCanvas.getContext('2d');
    //     ctxRes.putImageData(videoData, 0, 0);

    //     // apply edge detection to video image
    //     Pixastic.process(resCanvas, "edges", {mono:$scope.mono, invert:$scope.invert});
    //   }

    //   if (progress < 20000) {
    //     requestAnimationFrame(applyEffects);
    //   }
    // }

    // requestAnimationFrame(applyEffects);

});