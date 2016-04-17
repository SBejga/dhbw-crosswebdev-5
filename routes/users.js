var express = require('express');
var router = express.Router();

// POST new User
router.post('/', function (req, res) {
    var body = req.body;
    //TODO: create new user
    body._id = "42";
    res.status(200).send(body);
});


// GET all Users
router.get('/', function (req, res) {
    //TODO: send array of users without credentials
    res.status(200).send([{_id: ""}]);
});

//GET one user by id
router.get('/:id', function (req, res) {
    var id = req.params.id;
    //TODO: Switch between two cases:
    // foreign access of user details (filtered fields)
    // own access of user details (complete fields)
    res.send({_id: id});
});

//PUT update one user
router.put('/', function (req, res) {
    var user = req.body;
    //TODO: update user if allowed
    res.status(200).send(user);
});

//DELETE delete User
router.delete('/', function (req, res) {
    var body = req.body;
    //TODO: delete user if allowed
    res.status(200).send(body);
});

module.exports = router;