/* GET home page */
module.exports.index = function(req, res, next) {
  global.myAppVars.admin = false;
  
  res.render('index', {
    title: 'Volunteer Portal Home',
    admin: global.myAppVars.admin
  });
};
