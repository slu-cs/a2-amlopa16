// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?

const queries = [

  // last name alphabetically
  //Voter.find().sort('-last').limit(1),

  // Voters in Canton zip code
  //Voter.find().where('zip').equals('13617'),

  //Voter.find().where('first').equals('STARR'),

  Voter.find().where('history').includes('GE16')


];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    //console.log('Last alphabetical name: ', results[0]);
    //console.log('Canton Zips: ', results[1].map(p => p.zip));
    //console.log('Names with STARR: ', results[2].map(p => p.first));
    console.log('People who voted in 2016 GE :', results[0]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
