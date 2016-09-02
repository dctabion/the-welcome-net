var mongoose = require('mongoose');

// ----- Subdocument Schemas -----//

var affiliationSchema = new mongoose.Schema({
  displayText: String
});

var hearAboutSchema = new mongoose.Schema({
  displayText: String
});

var howOftenSchema = new mongoose.Schema({
  displayText: String
});

var timeOfDaySchema = new mongoose.Schema({
  displayText: String
});

var opportunityCategorySchema = new mongoose.Schema({
  displayText: String
});

var languageSchema = new mongoose.Schema({
  displayText: String
});


// ------ Parent Document Schema: Config ------- //
var myAppConfigSchema = new mongoose.Schema({
  affiliations: [ affiliationSchema ],
  hear_abouts: [ hearAboutSchema ],
  languages: [ languageSchema ],
  how_oftens: [ howOftenSchema ],
  times_of_day: [ timeOfDaySchema ],
  opportunity_categories: [ opportunityCategorySchema ]
});

mongoose.model("My_app_config", myAppConfigSchema);
