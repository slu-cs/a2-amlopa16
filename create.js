// Store some data in the faculty database
const fs = require("fs");
const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

var csv = 'voters.csv';

var lines = csv.split("\n");
while( typeof lines[0] !== "undefined" ){
    var line = lines.shift();
    console.log(line);
    var split = line.split(',');
    document.querySelector("#content").innerHTML += split[0]+"<br/>";
}
