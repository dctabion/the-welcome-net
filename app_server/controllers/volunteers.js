module.exports.register = function(req, res) {
  res.render('register', {
    title: 'Register a Volunteer',
    affiliations: {
      1: "McDonald's",
      2: "White Castle's",
      3: "Sam's Salad Bar (uggh)"
    },
    hear_abouts: {
      1: "The grapevine",
      2: "A little bird",
      3: "The chinese telephone"
    },
    languages: {
      1: "croatian",
      2: "serbian",
      3: "vulcan"
    },
    how_oftens: {
      1: "monthly",
      2: "twice per month",
      3: "weekly"
    },
    times_of_day: {
      1: "morning",
      2: "afternoon",
      3: "evening",
      4: "flexible"
    }
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
