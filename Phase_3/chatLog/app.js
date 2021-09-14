let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let socket = require("socket.io");
let chatModel = require("./chatModel");
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/ChatLog";
const { request, response } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose
  .connect(url)
  .then((response) => console.log("Database Connectes!"))
  .catch((err) => console.log(err));

let server = app.listen(8080, () =>
  console.log("Server running on port number 8080")
);
let io = socket(server);

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.on("connection", function (socket) {
  console.log("successfully Connected");

  socket.on("obj", (data) => {
    console.log(data);
    let chat = new chatModel({
      name: data.name,
      message: data.message,
    });
    chatModel.insertMany(chat, (err, result) => {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    });
  });
});
