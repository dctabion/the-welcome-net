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
  "croatian",
  "serbian",
  "vulcan"
];

var how_oftens = [
  "monthly",
  "twice per month",
  "weekly"
];

var times_of_day = {
  0: "Choose One",
  1: "morning",
  2: "afternoon",
  3: "evening",
  4: "flexible"
};

module.exports.getRegister = function(req, res) {
  res.render('register', {
    title: 'Register a Volunteer',
    affiliations: affiliations,
    hear_abouts: hear_abouts,
    languages: languages,
    how_oftens: how_oftens,
    times_of_day: times_of_day
  });
};

module.exports.postRegister = function(req, res) {
  console.log('======================');
  console.log('First Name: ' + req.body.first_name);
  console.log('Last Name: ' + req.body.last_name);
  console.log('Email: ' + req.body.email);
  console.log('Affiliation: ' + req.body.affiliation + ' ' + affiliations[req.body.affiliation]);
  console.log('Hear About Us: ' + req.body.hear_about_us + ' ' + hear_abouts[req.body.hear_about_us]);

  // "undefined" = not checked; "on" - checked
  console.log('Languages Spoken');
  for (var i=0; i < languages.length; i++) {
    // example variable name from form: language_1_croatian
    var language_var_name = "req.body.language_" + i.toString() + '_' + languages[i];
    console.log(i + ' ' + language_var_name + ': ' + eval(language_var_name));
  }

  console.log('How often: ' + req.body.how_often + ' ' + how_oftens[req.body.how_often]);
  console.log('Time of day: ' + req.body.time_of_day + ' ' + times_of_day[req.body.time_of_day]);
  console.log('Reliable vehicle and able to drive: ' + req.body.reliable_transportation);
  console.log('Family participation: ' + req.body.family_participation);
  console.log('Email List: ' + req.body.email_list);

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
