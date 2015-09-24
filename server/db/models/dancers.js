'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    danceName: {
        type: String
    },
    dance: {
        type: String
    }
});



mongoose.model('Dancers', schema);