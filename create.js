const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("voters.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      first: data[0],
      last: data[1],
      zip: data[2],
      history: data[3]
    });
  })
  .on("end", function() {
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db('voters_db')
          .collection('Voter')
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);
