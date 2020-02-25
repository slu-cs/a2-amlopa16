// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?

const queries = [

  // last name alphabetically
  Voter.find().sort('-last').limit(1),

  // Voters in Canton zip code
  Voter.countDocuments().find().where('zip').equals('13617'),

  // voters with first name starr
  Voter.find().where('first').equals('STARR'),

  Voter.find({history: /GE16/})


];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Last alphabetical name: ', results[0].map(p => p.first + p.last));
    console.log('Canton Zips: ', results[1].map(p => p.last));
    console.log('Names with STARR: ', results[2]);
    console.log('People who voted in 2016 GE :', results[3]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
