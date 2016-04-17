# dhbw-crosswebdev-5

## README

Github auschecken

    git clone https://github.com/SBejga/dhbw-crosswebdev-5
    
NPM Abhängigkeiten installieren

    npm install
    
Lokale MongoDB starten

    mongod --dbpath mongodb_data
    
config.json überprüfen

    vim config.json
    
Backend starten

    node app.js
    
## USAGE

### Get Users

Hinweis:  
`Wenn nicht lokal ausgeführt, entsprechend Base-URL ersetzen`

#### Create User

    POST http://localhost:3000/users
    {"firstname": "Frank", "lastname": "Underwood", "nick": "president" }
    
Antwort enthält den erstellten Token

    {
        "__v": 0,
        "firstname": "Frank",
        "lastname": "Underwood",
        "nick": "president",
        "_id": "5713cc1be521646bca43585f",
        "token": "d8b71d25-9da7-4979-bdd2-b9a7db70cc80",
        "admin": false,
        "created": "2016-04-17T17:47:07.213Z"
    }
    
#### Get User Details

Pfad enthält ID vom User `http://localhost:3000/users/:id`

    GET http://localhost:3000/users/5713cc1be521646bca43585f
    
Response:

    {
        "_id": "5713cc1be521646bca43585f",
        "firstname": "Frank",
        "lastname": "Underwood",
        "nick": "president",
        "__v": 0,
        "created": "2016-04-17T17:47:07.213Z"
    }


#### Get Users

    GET http://localhost:3000/users
    
Response

    [
        {
            "_id": "5713cd76e521646bca435862",
            "firstname": "Sherlock",
            "lastname": "Holmes",
            "nick": "holmes",
            "__v": 0,
            "created": "2016-04-17T17:52:54.566Z"
        },
        {
            "_id": "5713cd80e521646bca435863",
            "firstname": "Frank",
            "lastname": "Underwood",
            "nick": "president",
            "__v": 0,
            "created": "2016-04-17T17:53:04.997Z"
        }
    ]

#### Update User

Nur Felder übertragen, die aktualisiert werden sollen. Muss `_id` des zu ändernden User enthalten.

    PUT http://localhost:3000/users
    {"_id": "5713cd80e521646bca435863", "firstname": "Claire"}
    
## REPL

### Create User via REPL

start REPL

    $ node

Execute

    var mongoose = require('mongoose');
    mongoose.connect(require('./config.json').mongo_uri, console.log );
    
    var User = require('./models/user.js');
    var SB = new User({ firstname: "Sebastian", lastname: "Bejga", nick: "sbejga", admin: true });
    SB.save(console.log);
    
Example

    > null { created: Sun Apr 17 2016 18:13:44 GMT+0200 (CEST),
      admin: true,
      token: '9a4efd95-f041-4f71-bb65-b0b199d1f8a0',
      _id: 5713b6389a217d12bbd1852f,
      nick: 'sbejga',
      lastname: 'Bejga',
      firstname: 'Sebastian',
      __v: 0 } 1
