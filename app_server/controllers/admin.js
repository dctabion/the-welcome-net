/* GET Admin Home Page */
module.exports.index = function(req, res, next) {
  global.myAppVars.admin = true;
  res.render('index', {
    title: 'Admin Home',
    admin: global.myAppVars.admin
  });
};
