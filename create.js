const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

mongoose.connection.dropDatabase(function() {

  const fs = require('fs');
  const readline = require('readline');
  const file = readline.createInterface({
    input: fs.createReadStream('voters.csv')
  });


  const voters = [];
  file.on('line', function(line) {
    const columns = line.split(',');
    let v = new Voter({
        first: columns[0],
        last: columns[1],
        zip: columns[2],
        history: columns[3]
    });
    voters.push(v.save());
  });

  file.on('close', function() {
      Promise.all(voters)
      .then(() => mongoose.connection.close())
      .catch(error => console.log(error));
  });
});
