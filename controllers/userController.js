var User = require('../models/user.js');

var errorHandler = function (err, callback) {
    console.log("db err: ", err);
    callback(err, null);
};

var controller = {
    getAllUsers: function(callback) {
        var query = User.find({}, "-token -admin");
        query.exec(function(err, users) {
            if (err) { return errorHandler(err, callback); }
            callback(null, users);
        });
    },
    getOneUser: function(id, options, callback) {
        User.findOne({_id: id}, options, function(err, doc) {
            if (err) { return errorHandler(err, callback); }
            callback(null, doc);
        });
    },
    createNewUser: function (options, callback) {
        var newUser = new User(options);
        newUser.save( function(err, obj){
            if (err) { return errorHandler(err, callback); }
            callback(null, obj);
        });
    },
    updateUser: function(id, user, callback) {
        //new=true, to get updated object/document in callback instead of original.
        User.findOneAndUpdate({_id: id}, user, {new: true}, function (err, doc) {
            if (err) { return errorHandler(err, callback); }
            callback(null, doc);
        });
    },
    getUserByToken: function(token, callback) {
        User.findOne({token: token}, function (err, doc) {
            if (err) { return errorHandler(err, callback); }
            callback(null, doc);
        });
    }
};
module.exports = controller;