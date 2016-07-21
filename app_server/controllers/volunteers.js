var affiliations = [
  "McDonald's",
  "White Castle's",
  "Sam's Salad Bar (uggh)"
];

var hear_abouts = [
  "The grapevine",
  "A little bird",
  "The chinese telephone"
];

var languages = [
  "english",
  "croatian",
  "serbian",
  "vulcan"
];

var how_oftens = [
  "monthly",
  "twice per month",
  "weekly"
];

var times_of_day = [
  "morning",
  "afternoon",
  "evening",
  "flexible"
];

var opportunity_categories = [
  "Teaching english as a second Language (ESL)",
  "Legal assistance",
  "Translator"
];

module.exports.getRegister = function(req, res) {
  res.render('register', {
    title: 'VOLUNTEER REGISTRATION',
    affiliations: affiliations,
    hear_abouts: hear_abouts,
    languages: languages,
    how_oftens: how_oftens,
    times_of_day: times_of_day,
    opportunity_categories: opportunity_categories
  });
};

module.exports.postRegister = function(req, res) {
  console.log('======================');
  console.log('First Name: ' + req.body.first_name);
  console.log('Last Name: ' + req.body.last_name);
  console.log('Email: ' + req.body.email);
  console.log('Email List: ' + req.body.email_list);

  // "undefined" = not checked; "on" - checked
  console.log('Opportunity Categories of Interest:');
  for (var i=0; i < opportunity_categories.length; i++) {
    // example variable name from form: language_1_croatian
    var opportunity_var_name = "req.body.opportunity_category_" + i.toString();
    console.log(i + ' ' + opportunity_var_name + ': ' + eval(opportunity_var_name));
  }

  console.log('Affiliation: ' + req.body.affiliation + ' ' + affiliations[req.body.affiliation]);
  console.log('Hear About Us: ' + req.body.hear_about_us + ' ' + hear_abouts[req.body.hear_about_us]);

  // "undefined" = not checked; "on" - checked
  console.log('Languages Spoken');
  for (var i=0; i < languages.length; i++) {
    // example variable name from form: language_1_croatian
    var language_var_name = "req.body.language_" + i.toString();
    console.log(i + ' ' + language_var_name + ': ' + eval(language_var_name));
  }

  console.log('How often: ' + req.body.how_often + ' ' + how_oftens[req.body.how_often]);
  console.log('Time of day: ' + req.body.time_of_day + ' ' + times_of_day[req.body.time_of_day]);
  console.log('Reliable vehicle and able to drive: ' + req.body.reliable_transportation);
  console.log('Family participation: ' + req.body.family_participation);

  console.log('======================');
  res.render('register_confirmation', {
    title: "Registration Confirmation",
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });
};

module.exports.search = function(req, res) {
  res.render('index', { title: 'Search Volunteer List' });
};

module.exports.view = function(req, res) {
  res.render('view', {
    title: 'View One Volunteer',
    ids: [1,2,3,4,5],
    names: ["Jo", "Pete", "Vicini", "Ingrid", "Abbie"],
  });
};

module.exports.edit = function(req, res) {
  res.render('index', { title: 'Edit a Volunteer\'s User Data' });
};
