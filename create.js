const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});


file.on('line', function(line) {
  const columns = line.split(',');
  const v = new Voter({
      first: columns[0],
      last: columns[1],
      zip: Number(columns[2]),
      history: Number(columns[3])
  });
  v.save(function(error) {
    if (error) console.error(error.stack);
  });
});
