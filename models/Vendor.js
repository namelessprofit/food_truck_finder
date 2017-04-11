var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var VendorSchema = new Schema({
    userName: String,
    password: String,
    typeOfFood: String,
    currentLocation: Object,
}, {
    versionKey: false
});

var VendorSchema = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;
