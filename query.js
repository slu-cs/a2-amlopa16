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

  // last name alphabetically
  Voter.find().sort('-last').limit(1),

  // Voters in Canton zip code
  Voter.find().where('zip').equals('13617'),

  //Voter.find().where('first').in('STARR'),
];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Last alphabetical name: ', results[0].map(p => p.first, p => p.last));
    console.log('Canton Zips: ', results[1].map(p => p.zip));
    //console.log('Names with STARR: ', results[2].map(p => p.first));
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
