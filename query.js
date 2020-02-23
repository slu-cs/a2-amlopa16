// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?
const query = Voter.find();
query.exec(function(error, voters) {
  if (error) console.error(error.stack);
  console.log(voters);
});

const queries = [

  // What are names in alphabetical order?
  Voter.find().sort('-last').limit(1),

  // Voters in Canton zip code
  Voter.find().where('zip').equals(13617),

  // Who teaches 362?
  Voter.find().where('first').in('STARR'),
];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Names in order: ', results[0]);
    console.log('Canton Zips: ', results[1]);
    console.log('Names with STARR: ', results[2]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
