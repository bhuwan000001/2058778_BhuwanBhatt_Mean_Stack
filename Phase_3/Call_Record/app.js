let fs = require("fs");
let mongoClinet = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

var data = JSON.parse(fs.readFileSync("call_data.json").toString());

mongoClinet.connect(url, (err, client) => {
  if (!err) {
    console.log("Database Connected");
    let db = client.db("CallRecords");
    db.collection("callLogs").insertMany(data, (err, result) => {
      if (!err) {
        console.log("Successfully Inserted");
        console.log(result);
      } else {
        console.log(err);
      }
      client.close();
    });
  } else {
    console.log(err);
  }
});
