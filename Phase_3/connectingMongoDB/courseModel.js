let mongoose = require("mongoose");
mongoose.pluralize(null);

//create schema
let courseSchema = mongoose.Schema({
    _id: Number,
    courseName:String,
    description: String,
    amount: Number
});

let courseModel = mongoose.model("Courses",courseSchema);
module.exports = courseModel;