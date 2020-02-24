// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?

const queries = [
  Voter.count

  // last name alphabetically
  //Voter.find().sort('-last').limit(1),

  // Voters in Canton zip code
  //Voter.find().where('zip').equals('13617'),

  //Voter.find().where('first').equals('STARR')

  //Voter.find().where('history').in('GE16')


];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('COUNT :', results[0]);
    //console.log('Last alphabetical name: ', results[0].map(p => p.last));
    //console.log('Canton Zips: ', results[1].map(p => p.last));
    //console.log('Names with STARR: ', results[2].map(p => p.last));
    //console.log('People who voted in 2016 GE :', results[3]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
