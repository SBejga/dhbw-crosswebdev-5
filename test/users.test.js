var request = require('supertest'); //npm install supertest
var app = require('../app.js');
var assert = require('assert');

/*
 * Test /Users
 */

describe('GET /users', function(){
    it('should be >= 0 users', function(done){
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.length >= 0, true, ">= 0 users");

                done();
            });
    })
});

describe('GET /users/:id', function(){
    it('should not found user', function(done){

        var id = "000000000000000000000000";

        request(app)
            .get('/users/' + id)
            .expect('Content-Type', /json/)
            .expect(404, done);
    })
});

describe('Create User, Get and Update', function(){

    var underwood;
    var underwood2;

    it('should create User', function(done){

        var newUser = {firstname: "Frank", lastname: "Underwood", nick: "president_"+Date.now(), admin: true};

        request(app)
            .post('/users')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.firstname, newUser.firstname, "created name should be match");
                assert.equal(res.body.lastname, newUser.lastname, "created name should be match");
                assert.equal(res.body.nick, newUser.nick, "created nick should be match");
                assert.equal(res.body.admin, newUser.admin, "created user should be admin");

                assert.notEqual(res.body._id, false, "created user should have _id");

                underwood = res.body;

                done();
            });
    });

    it('should get created user', function(done){

        request(app)
            .get('/users/'+underwood._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.firstname, underwood.firstname, "created name should be match");
                assert.equal(res.body.lastname, underwood.lastname, "created name should be match");
                assert.equal(res.body.nick, underwood.nick, "created nick should be match");

                assert.equal(res.body._id, underwood._id, "created user _id should match");

                done();
            });
    });

    it('should update created user', function(done){

        var putUser = {_id: underwood._id, firstname: "Claire"};

        request(app)
            .put('/users/')
            .send(putUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body._id, putUser._id, "id should match");
                assert.equal(res.body.firstname, putUser.firstname, "name should match");

                underwood2 = res.body;

                done();
            });
    });

    it('should get updated user', function(done){

        request(app)
            .get('/users/'+underwood._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.firstname, underwood2.firstname, "created name should be match");
                assert.equal(res.body.lastname, underwood2.lastname, "created name should be match");
                assert.equal(res.body.nick, underwood2.nick, "created nick should be match");

                assert.equal(res.body._id, underwood2._id, "created user _id should match");

                done();
            });
    });
});

describe('DELETE /users', function(){
    it('should be 501', function(done){

        request(app)
            .delete('/users/')
            // .send(deleteUser)
            .expect('Content-Type', /json/)
            .expect(501, done);
    })
});