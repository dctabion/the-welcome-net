var mongoose = require('mongoose');

var volunteerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  cell_number: String,
  home_number: String,
  email: String,
  subscribe: Boolean,
  opportunity_categories: [Number],
  languages: [Number],
  language_other: String,
  how_often: Number,
  times_of_day: [Number],
  reliable_transportation: Boolean,
  family_participation: Boolean,
  affiliation: Number,
  hear_about_us: Number
});

mongoose.model("Volunteer", volunteerSchema);
