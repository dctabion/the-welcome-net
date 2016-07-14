module.exports.register = function(req, res) {
  res.render('index', { title: 'Register' });
};

module.exports.list = function(req, res) {
  res.render('index', { title: 'Volunteer List' });
};

module.exports.view = function(req, res) {
  res.render('index', { title: 'View One Volunteer' });
};

module.exports.edit = function(req, res) {
  res.render('index', { title: 'Edit One Volunteer' });
};
