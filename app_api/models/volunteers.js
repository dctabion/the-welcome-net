var mongoose = require('mongoose');

var volunteerSchema = new mongoose.Schema({
  name: String,
  age: Number
});

mongoose.model("Volunteer", volunteerSchema);
