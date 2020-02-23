const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

const rows = [];
file.on('line', function(line) {
  const columns = line.split(',');
  rows.push({
    first: columns[0],
    last: columns[1],
    zip: Number(columns[2]),
    history: Number(columns[3])
  });
});
