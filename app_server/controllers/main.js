/* GET home page */
module.exports.index = function(req, res, next) {
  // TODO - fix when authentication is implemented
  // Set to user to volunteer
  global.myAppVars.admin = false;

  res.render('index', {
    title: 'Volunteer Portal Home',
    admin: global.myAppVars.admin
  });
};
