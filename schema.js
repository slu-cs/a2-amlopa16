// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of voters
const Voter = new mongoose.Schema({
  name: String,
  zip: Number,
  history: String
});

// Speed up queries on all fields
Voter.index({name: 1});
Voter.index({zip: 1});
Voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
