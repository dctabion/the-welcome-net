// Async modul
var async = require('async');

// Request Module configuration
var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.APP_URL;
}

// Nodemailer configuration
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

// login
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: global.myAppVars.TWN_EMAIL_BOT_USERNAME,
      clientId: global.myAppVars.TWN_GOOGLE_CLIENT_ID,
      clientSecret: global.myAppVars.TWN_GOOGLE_CLIENT_SECRET,
      refreshToken: global.myAppVars.TWN_GOOGLE_REFRESH_TOKEN,
      accessToken: global.myAppVars.TWN_GOOGLE_ACCESS_TOKEN
    })
  }
});


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
  console.log('yoyoyo - debugging here');
  console.log('global.myAppConfig in addVolunteer(): ', global.myAppConfig);
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

        var mailOptions = {
          from: global.myAppVars.TWN_EMAIL_BOT,
          to: global.myAppVars.TWN_EMAIL_ADMIN + ", " + global.myAppVars.TWN_EMAIL_DEVELOPER,
          subject: 'New Volunteer!',
          text: results[0].firstName + ' ' + results[0].lastName + ' has registered!\n' + global.myAppVars.server + '/volunteers/' + results[0]._id
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Email sent: ' + info.response);
        });

        // Send message to new registrant
        console.log('Send message to new registrant');
        console.log('new registrant email: ', volunteer.email)

        var html1 = '<h1>Welcome, ' + results[0].firstName + "!</h1>"
        html1 = html1 + '<p>Thank you for registering to volunteer with The Welcome Network! We are looking forward to connecting with you. We have a large and growing list of ways that individuals and churches can get involved. Let us know what strikes your interest!<\p><p>>English as a Second Language teacher (beginning fall 2017): once/twice weekly in the evenings-experience preferred but no second language is needed.</p><p>>English as a Second Language tutors: no experience/second language necessary.</p>';

        html1 = html1 + '<p>>Good Neighbors: The Welcome Network is a remote resettlement site, in partnership with USCCB, for the United States refugee resettlement program. We actively resettle victims of war and violence into Northwest Indiana. This program includes everything from picking up individuals and families at the airport, to helping them settle into their apartments, assisting with meals, language tutoring, securing employment, enrollment in school, and many other facets of life. We are looking for individuals, churches, and organizations that want to participate in this amazing opportunity.</p><p>>Administrative Volunteers: The Welcome Network is looking for an administrative assistant to schedule client interviews, mail completed case applications, database management, and keep things organized.</p><p>These are just some of our most common volunteers opportunities, most of these opportunities are flexible in schedule.</p>';

        html1 = html1 + '<p>Furthermore, we invite you to register for our monthly email newsletter:</p><a href="http://www.thewelcomenet.org/newsletter-sign-up-page">Sign Me Up!</a><p>If you have any questions or are interested in learning more about The Welcome Network, please email: <a href="mailto:info@thewelcomenet.org?Subject=Tell%20me%20more!">info@thewelcomenet.org</a></p><br><br><p>Katie Huish<br>Resettlement Coordinator<br><strong>Chicagoland Immigrant Welcome Network</strong><br>824 Hoffman St. | Hammond, IN 46327<br>219-932-4800 (ext. 106)</p><p><a href="https://twitter.com/TheWelcomeNet">Follow</a> the Welcome Network on Twitter<br><a href="https://www.facebook.com/TheWelcomeNetwork">Like</a> the Welcome Network on Facebook</p><p><a href="http://www.thewelcomenet.org/">thewelcomenet.org</a></p>';

        var mailOptions = {
          from: "Katie Huish<" + global.myAppVars.TWN_EMAIL_BOT + ">",
          to: volunteer.email,
          subject: 'Welcome!',
          // text: 'Welcome to the Welcome Net!',
          html: html1,
          replyTo: "katie@thewelcomenet.org"

        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Email sent: ' + info.response);
        });

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
        console.log('volunteer edited & app reconfigured!');
        res.render('volunteerView', {
          title: 'VIEW VOLUNTEER',
          status: 'Edit Completed!',
          config: global.myAppConfig,
          volunteer: volunteer,
          admin: true  // TODO
      })
    }); // close outer callback & outer async.parallel set
  });
  console.log('after async calls, the code keeps going! The magic of asyncronous function calls!');
};

module.exports.viewVolunteer = function(req, res) {
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

      res.render('volunteerView', {
        title: 'VIEW VOLUNTEER',
        config: global.myAppConfig,
        volunteer: volunteer,
        admin: true  // TODO
      });
    });
};

module.exports.deleteVolunteer = function(req, res) {
  console.log("---app_server: deleteVolunteer()");
  var requestOptions, path;
  path = '/api/volunteers/' + req.params.id;
  requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {},
    qs: {
      // query string
    }
  };

  request(
    requestOptions,
    function(err, response, volunteer) {
      console.log('---callback: Receive response from API call');
      res.redirect('/volunteers/');
    });
};


module.exports.sendmail = function(req, res) {
  console.log("---app_server: sendmail()");

  var mailOptions = {
    from: global.myAppVars.TWN_EMAIL_BOT,
    to: global.myAppVars.TWN_EMAIL_DEVELOPER,
    subject: 'Yoyo, Dood McGee',
    text: 'Hello World!',

  }
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  res.redirect('/volunteers/');
};


module.exports.getPrincess = function(req, res) {
  console.log("---app_server: getPrincess()");
  res.render('z-princess');
};
