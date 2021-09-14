let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let path = require("path");
const { request, response } = require("express");

let mongoose = require("mongoose");
let courseModel = require("./courseModel");
let url = "mongodb://localhost:27017/connectingMongo";

//connect to database
mongoose
  .connect(url)
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/addCourse", (request, response) => {
  response.sendFile(path.join(__dirname + '/addCourse.html'));
});

app.post("/addCourseFn", (request, response) => {
  let courseData = request.body;
  let course = new courseModel({
    _id: courseData.courseID,
    courseName: courseData.courseName,
    description: courseData.description,
    amount: courseData.amount,
  });

  courseModel.insertMany(course, (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
  });

  response.redirect("/getCourse");
});

app.get("/getCourse", (request, response) => {
  response.sendFile(path.resolve("src/fetchCourse.html"));
});

app.get("/fetchCourse", (request, response) => {
  //get the data from mongoDB
  courseModel.find({}, (err, data) => {
    if (!err) {
      response.send(data);
    } else {
      console.log(err);
      response.send(err);
    }
  });
});

app.get("/updateCourse", (request, response) => {
  response.sendFile(path.join(__dirname +  '/update.html'));
});

app.post("/updateCourseFn", (request, response) => {
  let data = request.body;
  courseModel.updateOne(
    { _id: data.courseID },
    { $set: { amount: data.amount } },
    (err, result) => {
      if (!err) {
        console.log(result);
        response.redirect("/getCourse");
      } else {
        response.send(err);
      }
    }
  );
});

app.get("/deleteCourse", (request, response) => {
  response.sendFile(path.join(__dirname +  '/delete.html'));
});

app.post("/deleteCourseFn", (request, response) => {
  let data = request.body;

  courseModel.deleteOne({ _id: data.courseID }, (err, result) => {
    if (!err) {
      console.log("Course deleted sucessfully!");
      response.redirect("/getCourse");
    } else {
      console.log(err);
      response.send("Failed to detele the course");
    }
  });
});

app.listen(9090, () => console.log("Server running on port number 9090"));
