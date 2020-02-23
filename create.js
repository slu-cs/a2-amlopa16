const fs = require("fs");
const mongodb = require("mongodb").MongoClient;

// I installed fastcsv on my vm for this
// and used https://bezkoder.com/node-js-csv-mongodb-collection/ as reference for importing csv stuff
const fastcsv = require("fast-csv");

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

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error, client) => {
        if (error) throw error;

        client
          .db("voters_db")
          .collection("category")
          .insertMany(csvData, (error, res) => {
            if (error) throw error;
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);
