app.directive('webcamDancing', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/joinParty/joinParty.html',
    controller: 'dancerCtrl',
    link: function(scope){
         var _video,
                patData;

            scope.showDemos = false;
            scope.edgeDetection = false;
            scope.mono = false;
            scope.invert = false;

            var start;

            var face = new tracking.ObjectTracker(['face']);


            var liveCanvas = document.querySelector('#live');
            face.on('track', function(event) {
              if (event.data.length === 0) {
                console.log('here?');
                // No objects were detected in this frame.
              } else {
                event.data.forEach(function(rect) {
                  console.log(rect);
                  // rect.x, rect.y, rect.height, rect.width
                });
              }
            });

            console.log('hi ', _video);

            scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

            // Setup a channel to receive a video property
            // with a reference to the video element
            // See the HTML binding in main.html
            scope.partyCam = {};
            

            scope.webcamError = false;
            scope.onError = function (err) {
                scope.$apply(
                    function() {
                        scope.webcamError = err;
                    }
                );
            };

            scope.onSuccess = function () {
                // The video element contains the captured camera data
                _video = scope.partyCam.video;

                console.log(scope.partyCam.video);
                scope.$apply(function() {
                    scope.patOpts.w = _video.width;
                    scope.patOpts.h = _video.height;
                    scope.showDemos = true;
                });
            };

            scope.onStream = function (stream) {
                // You could do something manually with the stream.
                  console.log('streaming?');
                  scope.streaming = true;

                
            };


            var removeBackground = function(timestamp){
                    //   var timestamp = Date.now();
                    // console.log(timestamp);
                     var progress = timestamp - start;

                    // var liveCanvas = document.querySelector('#live');
                    if (!liveCanvas) return;

                    liveCanvas.width = _video.width;
                    liveCanvas.height = _video.height;
                    var ctxLive = liveCanvas.getContext('2d');
                    var background_data = scope.backgroundIdata;


                      var idata = getVideoData(scope.patOpts.x, scope.patOpts.y, scope.patOpts.w, scope.patOpts.h);
                      ctxLive.putImageData(idata, 0, 0);

            
                        // ctxLive.drawImage(_video, 0, 0, _video.width, _video.height);
                        // // var background_data = scope.background.getImageData(0, 0, ctxLive.width, ctxLive.height);
                        // var frame = ctxLive.getImageData(0, 0, ctxLive.width, ctxLive.height);
                        var l = idata.data.length / 4;

                        for (var i = 0; i < l; i++) {
                          var r = idata.data[i * 4 + 0];
                          var g = idata.data[i * 4 + 1];
                          var b = idata.data[i * 4 + 2];
                          if ((g < background_data.data[i*4+0] +30 && g > background_data.data[i*4+0] -30) && (r < background_data.data[i*4+1] + 30 && r > background_data.data[i*4+1] - 30) && (b < background_data.data[i*4+2] + 30 && b > background_data.data[i*4+2] - 30)){
                              idata.data[i * 4 + 3] = 0;
                            }
                        }

                        ctxLive.putImageData(idata, 0, 0);
                        // socket.emit('dancingVideo', idata);
                        // var stream = ss.createStream();
                        // ss(socket).emit('dancingVideo', idata);
                      

                      if (progress < 20000) {
                        requestAnimationFrame(removeBackground);
                      }


            };
            


            /**
             * Make a snapshot of the camera data and show it in another canvas.
             */
            scope.makeSnapshot = function makeSnapshot() {
                if (_video) {
                    var patCanvas = document.querySelector('#snapshot');
                    if (!patCanvas) return;

                    patCanvas.width = _video.width;
                    patCanvas.height = _video.height;
                    var ctxPat = patCanvas.getContext('2d');

                    var idata = getVideoData(scope.patOpts.x, scope.patOpts.y, scope.patOpts.w, scope.patOpts.h);
                    ctxPat.putImageData(idata, 0, 0);
                    scope.backgroundIdata = idata;

                    sendSnapshotToServer(patCanvas.toDataURL());

                    patData = idata;

                    start = Date.now()
                    
                    requestAnimationFrame(removeBackground);
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
                scope.background = imgBase64;
            };


            (function() {
              var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
              window.requestAnimationFrame = requestAnimationFrame;
            })();



    }
  };
});