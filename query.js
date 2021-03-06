// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?

const queries = [

  // last name alphabetically
  Voter.find().sort('-last').limit(1),

  // how many zips in county
  Voter.distinct('zip'),

  // Voters in Canton zip code
  Voter.find().where('zip').equals('13617'),

  // voters with first name starr
  Voter.find().where('first').equals('STARR'),

  // voters in 2016 general election
  Voter.find({history: /GE16/})
];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Last alphabetical name: ', results[0].map(p => p.first + ' ' + p.last));
    console.log('Number of County Zips', results[1].length);
    console.log('Canton Zips: ', results[2].length);
    console.log('Names with STARR: ', results[3].map(v => v.first + ' ' + v.last));
    console.log('People who voted in 2016 GE :', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
