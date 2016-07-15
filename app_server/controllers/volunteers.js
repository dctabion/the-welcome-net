module.exports.register = function(req, res) {
  res.render('register', { title: 'Register a Volunteer' });
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
