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
  hearAbouts: [ hearAboutSchema ],
  languages: [ languageSchema ],
  howOftens: [ howOftenSchema ],
  timesOfDay: [ timeOfDaySchema ],
  opportunityCategories: [ opportunityCategorySchema ]
});

mongoose.model("My_app_config", myAppConfigSchema);
