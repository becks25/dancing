'use strict';
var socketio = require('socket.io');
var ss = require('socket.io-stream');
var path = require('path');

var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!

        // socket.on('dancingVideo', function(videoStream){
        //   console.log('received video!');
        // });

        // ss(socket).on('dancingVideo', function(stream) {
        //   // fs.createReadStream('/path/to/file').pipe(stream);
        //   console.log('stream!');
        //   ss(socket).emit('streamDance', stream);
        // });
    });
    
    return io;

};
