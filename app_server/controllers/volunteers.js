module.exports.register = function(req, res) {
  res.render('index', { title: 'Register a Volunteer' });
};

module.exports.search = function(req, res) {
  res.render('index', { title: 'Search Volunteer List' });
};

module.exports.view = function(req, res) {
  res.render('index', { title: 'View One Volunteer' });
};

module.exports.edit = function(req, res) {
  res.render('index', { title: 'Edit a Volunteer\'s User Data' });
};
