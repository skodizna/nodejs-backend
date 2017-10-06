'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ItemSchema = new Schema({
    name: String,
    web: String,
    menu: {
        type: Schema.Types.Mixed,
        required: true
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    type: String
});

module.exports = mongoose.model('Items', ItemSchema);