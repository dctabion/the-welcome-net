var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer')

var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://morning-scrubland-42645.herokuapp.com";
}

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}


// This function saves volunteer to database, packages & and sends response object for adding volunteer
var savePackageAndSendResponseForAdd = function(res, volunteer, config) {
  console.log('--packageAndSendResponseForAdd() helper');
  // Package response object
  var responseObject = {
    volunteer: volunteer,
    newConfig: null
  };

  if (config) {
    responseObject.newConfig = config;
  }

  console.log('responseObject: ', responseObject);

  Volunteer.create(volunteer,
    function(err, volunteer) {
      if (err) {
        console.log('error creating volunteer! err: ', err);
        sendJsonResponse(res, 400, err);
      }
      else {
        console.log('sending responseObject: ', responseObject);
        sendJsonResponse(res, 201, responseObject);
      }
    }
  );
};

module.exports.volunteersCreate = function(req, res) {
  console.log('---app_api: volunteersCreate()');

  console.log('req.body:');
  console.log(req.body);

  var variable_name = "";

  //------- Create and fill volunteer object ------//
  var volunteer = {};

  volunteer.first_name = req.body.first_name;
  volunteer.last_name = req.body.last_name;
  volunteer.cell_number = req.body.cell_number;
  volunteer.home_number = req.body.home_number;
  volunteer.email = req.body.email;

  // Subscribe
  if (req.body.subscribe == "Yes") {
    volunteer.subscribe = true;
  }
  else {
    volunteer.subscribe = false;
  }

  // Opportunity categories
  volunteer.opportunity_categories = [];
  for (var i = 0; i < global.my_app_config.opportunity_categories.length; i++) {
    variable_name = "req.body.opportunity_category_" + parseInt(i);
    // console.log('variable_name: ', variable_name);
    if ( eval(variable_name) == "on") {
      volunteer.opportunity_categories.push(i);
    }
  }
  console.log('typeof(req.body.how_often): ', typeof(req.body.how_often));
  volunteer.how_often = req.body.how_often;

  // Times of Day
  volunteer.times_of_day = [];
  for (var i = 0; i < global.my_app_config.times_of_day.length; i++) {
    variable_name = "req.body.times_of_day_" + parseInt(i);
    // console.log('variable_name: ', variable_name);
    if ( eval(variable_name) == "on") {
      volunteer.times_of_day.push(i);
    }
  }

  // Reliable Transportation
  console.log('typeof(req.body.reliable_transportation): ', typeof(req.body.reliable_transportation));
  if (req.body.reliable_transportation == "Yes") {
    volunteer.reliable_transportation = true;
  }
  else {
    volunteer.reliable_transportation = false;
  }

  // Family Participation
  if (req.body.family_participation == "Yes") {
    volunteer.family_participation = true;
  }
  else {
    volunteer.family_participation = false;
  }

  // Affiliation
  volunteer.affiliation = req.body.affiliation;

  // Hear Abouts
  volunteer.hear_about_us = req.body.hear_about_us;

  // Languages
  volunteer.languages = [];
  for (var i = 0; i < global.my_app_config.languages.length; i++) {
    variable_name = "req.body.language_" + parseInt(i);
    if ( eval(variable_name) == "on") {
      volunteer.languages.push(i);
    }
  }

  // Add new language to configuration if necessary
  if (req.body.language_other) {
    if(req.body.language_other.length > 0) {
      // Add new language to config file
      var requestOptions, path;
      path = '/api/config/language/' + req.body.language_other;
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
        function(err, response, config) {
          console.log('---callback: Receive response from API call to update config with new language');
          // console.log('body: ', body);



          // add err handling TODO

          // Add language index to volunteer's list of languages spoken
          // Change to not use global and use body TODO
          console.log('global.my_app_config.languages.length: ', global.my_app_config.languages.length);
          volunteer.languages.push(global.my_app_config.languages.length);

          console.log('--inside request to add language().  volunteer: ', volunteer);


          // ----- Create response object, store volunteer in DB, and send responseObject ---- //
          savePackageAndSendResponseForAdd(res, volunteer, config);
          // // Package response object
          // var responseObject = {
          //   volunteer: volunteer,
          //   newConfig: body
          // };
          //
          // Volunteer.create(volunteer,
          //   function(err, volunteer) {
          //     if (err) {
          //       sendJsonResponse(res, 400, err);
          //     }
          //     else {
          //       sendJsonResponse(res, 201, responseObject);
          //     }
          //   }
          // );
        }
      );


    }
  }

  // No new language added
  else {
    // ----- Create response object, store volunteer in DB, and send responseObject ---- //
    console.log('no new language added.  package and send response for add');
    console.log('yoyo volunteer: ', volunteer);
    // create a config object so it is not undefined when calling packageAndSendResponseForAdd()
    var config = null;
    savePackageAndSendResponseForAdd(res, volunteer, config);
  }
  // newConfig = global.tmpConfig;
  // console.log("global.tmpConfig: ", global.tmpConfig);
  // console.log("newConfig: ", newConfig);


}

module.exports.volunteersReadOne = function(req, res) {
  sendJsonResponse(res, 200, "Sweet");
}


module.exports.volunteersList = function(req, res) {
  console.log('---app_api: volunteersList()');

  Volunteer.find().exec(function(err, volunteers){
    // Volunteers not found.  NULL
    if (!volunteers) {
      sendJsonResponse(res, 404, { messages: "locationid not found"});
      return;
    }

    // DB error
    else if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    // Send the volunteer list
    else {
      sendJsonResponse(res, 200, volunteers);
    }
  });

}
