const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});


const saves = [];
file.on('line', function(line) {
  const columns = line.split(',');
  const v = new Voter({
      first: columns[0],
      last: columns[1],
      zip: columns[2],
      history: columns[3]
  });
  v.save();
});

mongoose.connection.dropDatabase();

file.on('close', function(error) {
  if (error) console.error(error.stack);
    //.then(() => Promise.all(saves))
  mongoose.connection.close();
  process.exit(0);
});
