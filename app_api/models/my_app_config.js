var mongoose = require('mongoose');

var myAppConfigSchema = new mongoose.Schema({
  affiliations: [ String ],
  hear_abouts: [ String ],
  languages: [ String ],
  how_oftens: [ String ],
  times_of_day: [ String ],
  opportunity_categories: [ String ]
});

mongoose.model("My_app_config", myAppConfigSchema);
