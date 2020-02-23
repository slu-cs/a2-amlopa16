const mongodb = require("mongodb");
const csvtojson = require("csvtojson");
const Voter = require('./schema');

let url = "mongodb://localhost:27017/";

csvtojson()
  .fromFile("voters.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("voters_db")
          .collection("Voter")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            client.close();
          });
      }
    );
  });
