var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    userName: String,
    password: String,
    currentCity: Object,
}, {
    versionKey: false
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
