'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    isNegotiable: { type: Boolean, required: true },
    hasPictures: { type: Boolean, required: true },
    datePosted: Date,
    phone: { type: String, required: true }

});

module.exports = mongoose.model('Item', ItemSchema);