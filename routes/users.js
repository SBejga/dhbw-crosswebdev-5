var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');

// POST new User
router.post('/', function (req, res) {
    var options = req.body;
    userController.createNewUser(options, function (err, doc) {
        if (err) {
            res.status(500).send({"err": err});
            return;
        }

        res.send(doc);
    });
});
// GET all Users
router.get('/', function (req, res) {
    userController.getAllUsers(function (err, data) {
        if (err) {
            res.status(500).send({"err": err});
            return;
        }

        res.status(200).send(data);
    });
});

//GET one user by id
router.get('/:id', function (req, res) {
    var id = req.params.id;
    //TODO: with auth, switch between own and foreign resource
    var options = "-token -admin";
    userController.getOneUser(id, options, function (err, user) {
        if (err) {
            res.status(500).send({"err": err});
            return;
        }

        if (user) {
            res.send(user);

        } else {
            res.status(404).send({"err": "Not Found"});
        }
    });
});

//PUT update one user
router.put('/', function (req, res) {
    var user = req.body;
    //TODO: with auth, check if allowed
    userController.updateUser(user._id, user, function (err, updUser) {
        if (err) {
            res.status(500).send({"err": err});
            return;
        }

        if (updUser) {
            res.send(updUser);
        } else {
            res.status(404).send({"err": "Not Found"});
        }
    });
});

//DELETE delete User
router.delete('/', function (req, res) {
    //TODO: implement remove in userController
    res.status(501).send({ success: false });
});

module.exports = router;