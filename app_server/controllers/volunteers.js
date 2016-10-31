var async = require('async');

var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.APP_URL;
}

// Helper Functions for this module
function validateNormalizeAndPackageVolunteerForApi(req, addedItems) {
  // ------- Validate data TODO --------- //
  // ------- Normalize data TODO --------- //
  // ------ Extract data from POST request and repackage to send to API ------ //
  console.log('validateNormalizeAndPackageVolunteerForApi()');
  console.log('normalizing the data!');
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

  // console.log('Hear About Other: ', req.body.hear_about_other);
  // volunteer.hearAboutUsOther = req.body.hear_about_other;

  for (var i=0; i<addedItems.length; i++) {
    if(addedItems[i].type == "language") {
      volunteer.languages.push(addedItems[i].data._id);
    }
    else if((addedItems[i].type == "affiliation") && (req.body.affiliation == "other")) {
      volunteer.affiliation = addedItems[i].data._id;
    }
  }

  // Params not specified by user
  console.log('Admin: ' + req.body.admin);
  console.log('typeof(req.body.admin): ',typeof(req.body.admin));
  if (req.body.admin == "true") {
    volunteer.admin = true;
  }
  else if(req.body.admin == "false") {
    volunteer.admin = false;
  }
  else {
    console.log('Error!!! req.body.admin was not "true" nor "false".  It is: ', req.body.admin);
    volunteer.admin = false;
  }

  console.log('Donor Status: ', req.body.donor_status);
  console.log('typeof(req.body.donorStatus): ',typeof(req.body.donor_status));
  volunteer.donorStatus = parseInt(req.body.donor_status);

  console.log('Normalized & packaged volunteer before sending to API:');
  console.log(volunteer);
  console.log('typeof(volunteer.admin): ', typeof(volunteer.admin));
  console.log('typeof(volunteer.donorStatus): ', typeof(volunteer.donorStatus));
  console.log('======================');

  return volunteer;
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

  // Build array of async requests
  var apiRequests = [];

  // load a dummy function so at least there is one async call and the results callback executes
  var tmpFunction = function(callback) {
    setTimeout(function(){
      console.log('function one timeout done!');
      callback(null, { dummy: "dummy"} );
    }, 1)};

  apiRequests.push(tmpFunction);

  // -- Prepare functions that may be conditionally added -- //

  // --- function to POST new language to API -- //
  var newLanguageRequest = function(callback) {
    var requestOptions, path;
    path = '/api/config/languages/new/' + req.body.language_other;
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: {},
      qs: {
        // query string
      }
    };

    request(
      requestOptions,
      function(err, response, newLanguage) {
        console.log('---callback: Receive response from API call to POST new language');
        callback(err, {type: "language", data: newLanguage});
      }
    );
  };

  // --- function to POST new affilation to API -- //
  var newAffiliationRequest = function(callback) {
    var requestOptions, path;
    path = '/api/config/affiliations/new/' + req.body.affiliation_other;
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: {},
      qs: {
        // query string
      }
    };

    request(
      requestOptions,
      function(err, response, newAffiliation) {
        console.log('---callback: Receive response from API call to POST new affiliation');
        callback(err, { type: "affiliation", data: newAffiliation});
      }
    );
  };

  // other language selected by registrant && the other language is not an empty string
  if ((req.body.language_other_selection == "on") && (req.body.language_other.length > 0)) {
    console.log('need to add a new language');
    // add API request to add new language
    apiRequests.push(newLanguageRequest);
  }

  // other affiliation selected by registrant && the other affiliation is not an empty string
  if ((req.body.affiliation == "other") && (req.body.affiliation_other.length > 0)) {
    console.log('need to add a new affiliation');
    // add API request to add new language
    apiRequests.push(newAffiliationRequest);
  }

  // execute async calls
  async.parallel(apiRequests,
    function(err, results) {

    // remove dummy function from queue;
    results.shift()
    console.log("results:", results);

    var volunteer = validateNormalizeAndPackageVolunteerForApi(req, results);

    var addVolunteerRequest = function(callback) {
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
        function(err, response, volunteer) {
          console.log('---callback: Receive response from API call to POST new volunteer');
          callback(null, volunteer);
        }
      );
    };

    var reconfigureAppRequest = function(callback) {
      // Make request to volunteer API to store data
      var requestOptions, path;
      path = '/api/config';
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
        function(err, response, newConfig) {
          console.log('---callback: Receive response from API call to GET new config');
          console.log('Reconfiguring app');
          global.myAppConfig.opportunityCategories = newConfig.opportunityCategories;
          global.myAppConfig.timesOfDay = newConfig.timesOfDay;
          global.myAppConfig.howOftens = newConfig.howOftens;
          global.myAppConfig.languages = newConfig.languages;
          global.myAppConfig.hearAbouts = newConfig.hearAbouts;
          global.myAppConfig.affiliations = newConfig.affiliations;

          callback(null, newConfig);
        }
      );
    };

    async.parallel([
      addVolunteerRequest,
      reconfigureAppRequest,
      ],
      function(err, results) {
        console.log('volunteer added & app reconfigured!');
        res.render('register_confirmation', {
          title: "Registration Confirmation",
          first_name: results[0].firstName,
          last_name: results[0].lastName
        });
      }
    ); // close outer callback & outer async.parallel set
  });
    console.log('after async calls, the code keeps going! The magic of asyncronous function calls!');
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

      // create arrays for user settings for checklists
      var timesOfDaySelections = [];
      var checked;
      for (var i=0; i < global.myAppConfig.timesOfDay.length; i++) {
        checked = "";
        for (var j=0; j< volunteer.timesOfDay.length; j++) {
          // found a match.  set checked to true and break.
          if (volunteer.timesOfDay[j] == global.myAppConfig.timesOfDay[i]._id) {
            checked = "checked";
            // console.log("matched an language");
            break;
          }
        }
        // console.log("checked: ", checked);
        timesOfDaySelections.push(checked);
      }
      console.log("timesOfDaySelections: ",timesOfDaySelections);

      res.render('volunteerEdit', {
        title: 'VOLUNTEER EDIT',
        // Globals for form configuration
        affiliations: global.myAppConfig.affiliations,
        hearAbouts: global.myAppConfig.hearAbouts,
        languages: global.myAppConfig.languages,
        howOftens: global.myAppConfig.howOftens,
        timesOfDay: global.myAppConfig.timesOfDay,
        opportunityCategories: global.myAppConfig.opportunityCategories,
        admin: global.myAppVars.admin,
        // Individual volunteer data
        volunteer: volunteer,
        // Constructed objects representing volunteer options selected
        opportunitySelections: opportunitySelections,
        languageSelections: languageSelections,
        timesOfDaySelections: timesOfDaySelections
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

module.exports.doEditVolunteer = function(req, res) {
  console.log("---app_server: doEditVolunteer()");

  // Build array of async requests
  var apiRequests = [];

  // load a dummy function so at least there is one async call and the results callback executes
  var tmpFunction = function(callback) {
    setTimeout(function(){
      console.log('function one timeout done!');
      callback(null, { dummy: "dummy"} );
    }, 1)};

  apiRequests.push(tmpFunction);

  // -- Prepare functions that may be conditionally added -- //

  // --- function to POST new language to API -- //
  var newLanguageRequest = function(callback) {
    var requestOptions, path;
    path = '/api/config/languages/new/' + req.body.language_other;
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: {},
      qs: {
        // query string
      }
    };

    request(
      requestOptions,
      function(err, response, newLanguage) {
        console.log('---callback: Receive response from API call to POST new language');
        callback(err, {type: "language", data: newLanguage});
      }
    );
  };

  // --- function to POST new affilation to API -- //
  var newAffiliationRequest = function(callback) {
    var requestOptions, path;
    path = '/api/config/affiliations/new/' + req.body.affiliation_other;
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: {},
      qs: {
        // query string
      }
    };

    request(
      requestOptions,
      function(err, response, newAffiliation) {
        console.log('---callback: Receive response from API call to POST new affiliation');
        callback(err, { type: "affiliation", data: newAffiliation});
      }
    );
  };

  // other language selected by registrant && the other language is not an empty string
  if ((req.body.language_other_selection == "on") && (req.body.language_other.length > 0)) {
    console.log('need to add a new language');
    // add API request to add new language
    apiRequests.push(newLanguageRequest);
  }

  // other affiliation selected by registrant && the other affiliation is not an empty string
  if ((req.body.affiliation == "other") && (req.body.affiliation_other.length > 0)) {
    console.log('need to add a new affiliation');
    // add API request to add new language
    apiRequests.push(newAffiliationRequest);
  }

  // execute async calls
  async.parallel(apiRequests,
    function(err, results) {

    // remove dummy function from queue;
    results.shift()
    console.log("results:", results);

    var volunteer = validateNormalizeAndPackageVolunteerForApi(req, results);

    var addVolunteerRequest = function(callback) {
      // Make request to volunteer API to store data
      var requestOptions, path;
      path = '/api/volunteers/' + req.body.volunteer_id;
      console.log('path: ', path);
      requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: volunteer,
        qs: {
          // query string
        }
      };

      request(
        requestOptions,
        function(err, response, volunteer) {
          console.log('---callback: Receive response from API call to POST new volunteer');
          callback(null, volunteer);
        }
      );
    };

    var reconfigureAppRequest = function(callback) {
      // Make request to volunteer API to store data
      var requestOptions, path;
      path = '/api/config';
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
        function(err, response, newConfig) {
          console.log('---callback: Receive response from API call to GET new config');
          console.log('Reconfiguring app');
          global.myAppConfig.opportunityCategories = newConfig.opportunityCategories;
          global.myAppConfig.timesOfDay = newConfig.timesOfDay;
          global.myAppConfig.howOftens = newConfig.howOftens;
          global.myAppConfig.languages = newConfig.languages;
          global.myAppConfig.hearAbouts = newConfig.hearAbouts;
          global.myAppConfig.affiliations = newConfig.affiliations;

          callback(null, newConfig);
        }
      );
    };

    async.parallel([
      addVolunteerRequest,
      reconfigureAppRequest,
      ],
      function(err, results) {
        console.log('volunteer added & app reconfigured!');
        res.render('edit_confirmation', {
          title: "Edit Confirmation",
          dood: "dood"
        });
      }
    ); // close outer callback & outer async.parallel set
  });
    console.log('after async calls, the code keeps going! The magic of asyncronous function calls!');
};



module.exports.getPrincess = function(req, res) {
  console.log("---app_server: getPrincess()");
  res.render('z-princess');
};
