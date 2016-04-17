var request = require('supertest'); //npm install supertest
var app = require('../app.js');
var assert = require('assert');

/*
 * Test /Users
 */

describe('POST /users', function(){
    it('should respond with json', function(done){

        var newUser = {name: "test"};

        request(app)
            .post('/users')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.name, newUser.name, "created name should be match");

                done();
            });
    })
});

describe('GET /users', function(){
    it('should respond with json', function(done){
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    })
});

describe('GET /users/:id', function(){
    it('should respond with json', function(done){

        var id = "42";

        request(app)
            .get('/users/'+id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body._id, id, "id should match");

                done();
            });
    })
});

describe('PUT /users', function(){
    it('should respond with json', function(done){

        var putUser = {_id: "42", name: "test"};

        request(app)
            .put('/users/')
            .send(putUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body._id, putUser._id, "id should match");
                assert.equal(res.body.name, putUser.name, "name should match");

                done();
            });
    })
});

describe('DELETE /users', function(){
    it('should respond with json', function(done){

        var deleteUser = {_id: "42"};

        request(app)
            .delete('/users/')
            .send(deleteUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body._id, deleteUser._id, "id should match");

                done();
            });
    })
});