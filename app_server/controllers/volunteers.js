var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://morning-scrubland-42645.herokuapp.com";
}


module.exports.addVolunteer = function(req, res) {
  console.log('---app_server: addVolunteer()');
  // console.log('global.myAppConfig: ', global.myAppConfig);
  // global.myAppVars.admin = false;

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
  if (req.body.subscribe == "Yes") {
    volunteer.subscribe = true;
  }
  else if (req.body.subscribe == "No") {
    volunteer.subscribe = false;
  }
  else {
    console.log("************** ERROR with req.body.email_list...not Yes or No!! ********");
    volunteer.subscribe = false;
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
  volunteer.hearAboutUs = req.body.hear_about;

  volunteer.admin = false;
  volunteer.donorStatus = 0;

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
      // console.log('body: ', body);

      // Reconfigure app if new config available
      if (body.newConfig) {
        console.log('got a new config.  Reconfiguring app');
        global.myAppConfig.opportunityCategories = body.newConfig.opportunityCategories;
        global.myAppConfig.timesOfDay = body.newConfig.timesOfDay;
        global.myAppConfig.howOftens = body.newConfig.howOftens;
        global.myAppConfig.languages = body.newConfig.languages;
        global.myAppConfig.hearAbouts = body.newConfig.hearAbouts;
        global.myAppConfig.affiliations = body.newConfig.affiliations;
        // console.log("global.myAppConfig.languages: ", global.myAppConfig.languages);
      }

      res.render('register_confirmation', {
        title: "Registration Confirmation",
        first_name: body.volunteer.firstName,
        last_name: body.volunteer.lastName
      });

    });
};

module.exports.editVolunteer = function(req, res) {
  console.log('---app_server: editVolunteer()');
  // console.log('global.myAppConfig: ', global.myAppConfig);
  // console.log('req.query.opportunity_categories: ', req.query.opportunity_categories);
  // console.log('typeof: ', typeof(req.query.opportunity_categories));
  console.log('req.params.id: ', req.params.id);

  // Get volunteer info from database
  var requestOptions, path;
  path = '/api/volunteers/' + req.params.id;
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
    function(err, response, volunteer) {
      console.log('---callback: Receive response from API call');
      console.log('volunteer:', volunteer);

      // create arrays for user settings for checklists
      var opportunitySelections = [];
      var checked;
      for (var i=0; i < global.myAppConfig.opportunityCategories.length; i++) {
        checked = "";
        for (var j=0; j< volunteer.opportunityCategories.length; j++) {
          // found a match.  set checked to true and break.
          if (volunteer.opportunityCategories[j] == global.myAppConfig.opportunityCategories[i]._id) {
            checked = "checked";
            // console.log("matched an opportunity");
            break;
          }
        }
        // console.log("checked: ", checked);
        opportunitySelections.push(checked);
      }
      console.log("opportunitySelections: ",opportunitySelections);




      // create arrays for user settings for checklists
      var languageSelections = [];
      var checked;
      for (var i=0; i < global.myAppConfig.languages.length; i++) {
        checked = "";
        for (var j=0; j< volunteer.languages.length; j++) {
          // found a match.  set checked to true and break.
          if (volunteer.languages[j] == global.myAppConfig.languages[i]._id) {
            checked = "checked";
            // console.log("matched an language");
            break;
          }
        }
        // console.log("checked: ", checked);
        languageSelections.push(checked);
      }
      console.log("languageSelections: ",languageSelections);






      res.render('volunteerEdit', {
        title: 'VOLUNTEER EDIT',
        affiliations: global.myAppConfig.affiliations,
        hearAbouts: global.myAppConfig.hearAbouts,
        languages: global.myAppConfig.languages,
        howOftens: global.myAppConfig.howOftens,
        timesOfDay: global.myAppConfig.timesOfDay,
        opportunityCategories: global.myAppConfig.opportunityCategories,
        admin: global.myAppVars.admin,
        volunteer: volunteer,
        opportunitySelections: opportunitySelections,
        languageSelections: languageSelections
      }); // end res.render()
    }); // end request()


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
    function(err, response, volunteers) {
      console.log('---callback: Receive response from API call');
      // console.log('body: ', body);

      // Filter volunteers function.  Returns: TRUE=keep item in array.  FALSE=remove item from array
      // Must pass all queries/filters to return TRUE
      // Once it fails a filter/query, stop filtering and return FALSE
      // If it matches a filter/query, set keep_volunteer to TRUE and continue filtering
      function filterVolunteers(volunteer) {
        // By default, remove subscriber from list.  Tests will change to true
        var keep_volunteer = false;

        // Subscriber Filter
        if ( (req.query.subscribers == "on") && (volunteer.subscribe == false) ) {
          return false;
        }

        // Driver Filter
        if ( (req.query.drivers == "on") && (volunteer.reliableTransportation == false) ) {
          return false;
        }

        // Family Participation
        if ( (req.query.family_participation == "on") && (volunteer.familyParticipation == false) ) {
          return false;
        }

        // Opportunity
        if ( (req.query.opportunity != undefined) && (req.query.opportunity != "") ){
          console.log('this includes an opp query: ', req.query.opportunity);
          // console.log('volunteer.opportunityCategories:', volunteer.opportunityCategories);
          for (var i=0; i < volunteer.opportunityCategories.length; i++) {
            // if it matches, keep this volunteer in the list
            if (volunteer.opportunityCategories[i] == req.query.opportunity) {
              console.log('keeping!');
              keep_volunteer = true;
            }
          }

          // no match! Remove volunteer from list
          if (keep_volunteer == false) {
            return false;
          }
        }

        // Language
        if ( (req.query.language != undefined) && (req.query.language != "") ){
          console.log('this includes a language query: ', req.query.language);
          for (var i=0; i < volunteer.languages.length; i++) {
            // if it matches, keep this volunteer in the list
            if (volunteer.languages[i] == req.query.language) {
              console.log('keeping!');
              keep_volunteer = true;
            }
          }

          // no match! Remove volunteer from list
          if (keep_volunteer == false) {
            return false;
          }
        }

        // Hear Abouts
        if ( (req.query.hear_about != undefined) && (req.query.hear_about != "") ) {
          if (volunteer.hearAboutUs == req.query.hear_about) {
            keep_volunteer = true;
          }
          // no match! Remove volunteer from list
          if (keep_volunteer == false) {
           return false;
          }
        }

        // Affiliation
        if ( (req.query.affiliation != undefined) && (req.query.affiliation != "") ) {
          if (volunteer.affiliation == req.query.affiliation) {
            keep_volunteer = true;
          }
          // no match! Remove volunteer from list
          if (keep_volunteer == false) {
           return false;
          }
        }


        // no query
        else {
          return true;
        }

        // queries but didn't return yet
        return keep_volunteer;
      }

      // Perform filtering of volunteer list
      console.log("filtering subscribers");
      var filteredVolunteers = volunteers.filter(filterVolunteers);
      volunteers = filteredVolunteers;

      res.render('volunteerList', {
        title: 'VOLUNTEER LIST',
        volunteers: volunteers,
        affiliations: global.myAppConfig.affiliations,
        hearAbouts: global.myAppConfig.hearAbouts,
        languages: global.myAppConfig.languages,
        howOftens: global.myAppConfig.howOftens,
        timesOfDay: global.myAppConfig.timesOfDay,
        opportunityCategories: global.myAppConfig.opportunityCategories,
        admin: global.myAppVars.admin
      });
    });
};

module.exports.getPrincess = function(req, res) {
  res.render('z-princess');
};
