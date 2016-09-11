var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://morning-scrubland-42645.herokuapp.com";
}


module.exports.addVolunteer = function(req, res) {
  console.log('---app_server: addVolunteer()');

  res.render('register', {
    title: 'VOLUNTEER REGISTRATION',
    affiliations: global.myAppConfig.affiliations,
    hearAbouts: global.myAppConfig.hearAbouts,
    languages: global.myAppConfig.languages,
    howOftens: global.myAppConfig.howOftens,
    timesOfDay: global.myAppConfig.timesOfDay,
    opportunityCategories: global.myAppConfig.opportunityCategories
  });

};

module.exports.doAddVolunteer = function(req, res) {
  console.log('---app_server: doAddVolunteer()');
  console.log('req.body: ', req.body);
  console.log('======================');

  // ------- Validate data TODO --------- //

  // ------- Normalize data TODO --------- //



  // ------ Extract data from POST request and repackage to send to API ------ //
  var volunteer = {};
  var var_name = "";
  console.log('First Name: ' + req.body.first_name);
  volunteer.firstName = req.body.first_name;

  console.log('Last Name: ' + req.body.last_name);
  volunteer.lastName = req.body.last_name;

  console.log('Cellphone Number: ' + req.body.cell_number);
  volunteer.cellNumber = req.body.cell_number;

  console.log('Home Phone Number: ' + req.body.home_number);
  volunteer.homeNumber = req.body.home_number;

  console.log('Email: ' + req.body.email);
  volunteer.email = req.body.email;

  console.log('Subscribe to Email List: ' + req.body.subscribe);
  if (req.body.email_list == "Yes") {
    volunteer.emailList = true;
  }
  else if (req.body.email_list == "No") {
    volunteer.emailList = false;
  }
  else {
    console.log("************** ERROR with req.body.email_list...not Yes or No!! ********");
    volunteer.emailList = false;
  }

  // "undefined" = not checked; "on" - checked
  volunteer.opportunityCategories = [];
  console.log('Opportunity Categories of Interest:');
  for (var i=0; i < global.myAppConfig.opportunityCategories.length; i++) {
    var_name = "req.body.opportunity_" + global.myAppConfig.opportunityCategories[i]._id;
    console.log("var_name: " + var_name + "  displayText: " + global.myAppConfig.opportunityCategories[i].displayText + "  " + eval(var_name));
    if (eval(var_name) == "on") {
      volunteer.opportunityCategories.push(global.myAppConfig.opportunityCategories[i]._id);
    }
  }

  // "undefined" = not checked; "on" - checked
  volunteer.languages = [];
  console.log('Languages Spoken:');
  for (var i=0; i < global.myAppConfig.languages.length; i++) {
    var_name = "req.body.language_" + global.myAppConfig.languages[i]._id;
    console.log("var_name: " + var_name + "  displayText: " + global.myAppConfig.languages[i].displayText + "  " + eval(var_name));
    if (eval(var_name) == "on") {
      volunteer.languages.push(global.myAppConfig.languages[i]._id);
    }
  }

  console.log('Language Other: ' + req.body.language_other);
  volunteer.languageOther = req.body.language_other;

  console.log('How often: ' + req.body.how_often);
  volunteer.howOften = req.body.how_often;

  volunteer.timesOfDay = [];
  console.log('Times of day: ');
  for (var i=0; i < global.myAppConfig.timesOfDay.length; i++) {
    var_name = "req.body.time_of_day_" + global.myAppConfig.timesOfDay[i]._id;
    console.log("var_name: " + var_name + "  displayText: " + global.myAppConfig.timesOfDay[i].displayText + "  " + eval(var_name));
    if (eval(var_name) == "on") {
      volunteer.timesOfDay.push(global.myAppConfig.timesOfDay[i]._id);
    }
  }

  console.log('Reliable vehicle and able to drive: ' + req.body.reliable_transportation);
  if (req.body.reliable_transportation == "Yes") {
    volunteer.reliableTransportation = true;
  }
  else if (req.body.reliable_transportation == "No") {
    volunteer.reliableTransportation = false;
  }
  else {
    console.log("************** ERROR with req.body.reliable_transportation...not Yes or No!! ********");
    volunteer.reliableTransportation = false;
  }

  console.log('Family participation: ' + req.body.family_participation);
  if (req.body.family_participation == "Yes") {
    volunteer.familyParticipation = true;
  }
  else if (req.body.family_participation == "No"){
    volunteer.familyParticipation = false;
  }
  else {
    console.log("************** ERROR with req.body.family_participation...not Yes or No!! ********");
    volunteer.familyParticipation = false;
  }

  console.log('Affiliation: ' + req.body.affiliation);
  volunteer.affiliation = req.body.affiliation;

  console.log('Hear About: ' + req.body.hear_about);
  volunteer.hearAbout = req.body.hear_about;

  console.log('Normalized & packaged volunteer before calling add volunteer API:');
  console.log(volunteer);
  console.log('======================');


  // Make request to volunteer API to store data
  var requestOptions, path;
  path = '/api/volunteers';
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: volunteer,
    qs: {
      // query string
    }
  };

  request(
    requestOptions,
    function(err, response, body) {
      console.log('---callback: Receive response from API call to POST new volunteer');
      console.log('body: ', body);

      // Reconfigure app if new config available
      if (body.newConfig) {
        console.log('got a new config.  Reconfiguring app');
        global.myAppConfig.opportunityCategories = body.newConfig.opportunityCategories;
        global.myAppConfig.timesOfDay = body.newConfig.timesOfDay;
        global.myAppConfig.howOftens = body.newConfig.howOftens;
        global.myAppConfig.languages = body.newConfig.languages;
        global.myAppConfig.hearAbouts = body.newConfig.hear_abouts;
        global.myAppConfig.affiliations = body.newConfig.affiliations;
        console.log("global.myAppConfig.languages: ", global.myAppConfig.languages);
      }

      res.render('register_confirmation', {
        title: "Registration Confirmation",
        first_name: body.volunteer.firstName,
        last_name: body.volunteer.lastName
      });

    });
};

module.exports.getVolunteerList = function(req, res) {
  console.log("---app_server: getVolunteerList()");

  var requestOptions, path;
  path = '/api/volunteers';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      // query string
    }
  };

  request(
    requestOptions,
    function(err, response, body) {
      console.log('---callback: Receive response from API call');
      console.log('body: ', body);
      res.render('volunteerList', {
        title: 'VOLUNTEER LIST',
        volunteers: body,
        affiliations: global.myAppConfig.affiliations,
        hearAbouts: global.myAppConfig.hearAbouts,
        languages: global.myAppConfig.languages,
        howOftens: global.myAppConfig.howOftens,
        timesOfDay: global.myAppConfig.timesOfDay,
        opportunityCategories: global.myAppConfig.opportunityCategories
      });
    });
};

module.exports.getPrincess = function(req, res) {
  res.render('z-princess');
};
