var mongoose = require('mongoose');


// ---- Parent/Volunteer Schema ----- //
var volunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  cellNumber: String,
  homeNumber: String,
  email: String,
  subscribe: Boolean,
  opportunityCategories: [String],
  languages: [String],
  howOften: String,
  timesOfDay: [String],
  reliableTransportation: Boolean,
  familyParticipation: Boolean,
  affiliation: String,
  hearAboutUs: String,
  admin: Boolean,
  donorStatus: Number
});

mongoose.model("Volunteer", volunteerSchema);
