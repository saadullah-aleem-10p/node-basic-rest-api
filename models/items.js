var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: { type: String, minlength: 4, maxlength: 25, required: true },
    description: String,
    price: Number,
    isNegotiable: { type: Boolean, required: true },
    hasPictures: { type: Boolean, required: true },
    datePosted: Date,
    phone: { type: String, minlength: 11, required: true }

});

//ItemSchema.pre('save', function(next) {
//    if (this.phone.length >11) {
//
//    }
//    next();
//});

module.exports = mongoose.model('Item', ItemSchema);