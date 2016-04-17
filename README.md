# dhbw-crosswebdev-5

## Create User via REPL

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
