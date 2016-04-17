var uuid = require('uuid');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: {type: String, trim: true, required: true, minlength: 1},
    lastname: {type: String, trim: true, required: true, minlength: 1},
    created: { type: Date, default: Date.now },
    admin: {type: Boolean, default: false},
    token: {type: String, default: uuid.v4},
    nick: {type: String, trim: true, required: true, unique: true, minlength: 1}
});

var User = mongoose.model('User', userSchema, "users"); //model: User, collection: users

module.exports = User;