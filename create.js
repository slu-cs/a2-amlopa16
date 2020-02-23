const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('majors.csv')
});

// Create an array of objects, so that each line of the file is represented by an object with three properties.
const rows = [];
file.on('line', function(line) {
  const columns = line.split(',');
  rows.push({
    discipline: columns[0],
    majors: Number(columns[1]),
    minors: Number(columns[2])
  });
});
