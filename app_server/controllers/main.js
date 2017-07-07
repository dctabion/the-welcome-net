/* GET home page */
module.exports.index = function(req, res, next) {
  // TODO - fix when authentication is implemented
  // Set to user to volunteer
  if (process.env.FORCE_ADMIN=="true") {
    global.myAppVars.admin = true;

  }
  else {
    global.myAppVars.admin = false;
  }

  // Register volunteers Register instead of index
  // res.render('index', {
  //   title: 'Volunteer Portal Home',
  //   admin: global.myAppVars.admin
  // });


  res.render('volunteerRegister', {
    title: 'VOLUNTEER REGISTRATION',
    affiliations: global.myAppConfig.affiliations,
    hearAbouts: global.myAppConfig.hearAbouts,
    languages: global.myAppConfig.languages,
    howOftens: global.myAppConfig.howOftens,
    timesOfDay: global.myAppConfig.timesOfDay,
    opportunityCategories: global.myAppConfig.opportunityCategories,
    admin: global.myAppVars.admin
  });
};
