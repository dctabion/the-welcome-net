var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer')

var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.APP_URL;
}

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}


// This utility function saves volunteer to database, packages & and sends response object for adding volunteer
var savePackageAndSendResponseForAdd = function(res, volunteer, config) {
  console.log('--savePackageAndSendResponseForAdd() helper');
  // Package response object
  var responseObject = {
    volunteer: volunteer,
    newConfig: null
  };

  if (config) {
    responseObject.newConfig = config;
  }

  // Strip out "other" text fields that are not stored in DB
  delete responseObject.languageOther;

  // console.log('--before Volunteer.create(): packaged responseObject: ', responseObject);

  Volunteer.create(volunteer,
    function(err, volunteer) {
      if (err) {
        console.log('error creating volunteer! err: ', err);
        sendJsonResponse(res, 400, err);
      }
      else {
        console.log('sending responseObject');
        // console.log('sending responseObject: ', responseObject);
        sendJsonResponse(res, 201, responseObject);
      }
    }
  );
};

module.exports.volunteersCreate = function(req, res) {
  console.log('---app_api: volunteersCreate()');

  var variable_name = "";

  //------- Create and fill volunteer object ------//
  var volunteer = req.body;
  console.log('volunteer = req.body:');
  console.log(volunteer);

  // Validate & Normalize volunteer object
  // TODO



  // Add new language to configuration if necessary
  if (volunteer.languageOther) {
    if(volunteer.languageOther.length > 0) {
      // Add new language to config file
      var requestOptions, path;
      path = '/api/config/language/new/' + volunteer.languageOther;
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
        function(err, response, configResponseObject) {
          console.log('---callback: Receive response from API call to update config with new language');
          // console.log('configResponseObject: ', configResponseObject);

          // add err handling TODO

          // Add language index to volunteer's list of languages spoken
          console.log("In volunteer-API: configResponseObject.newLanguage", configResponseObject.newLanguage);
          volunteer.languages.push(configResponseObject.newLanguage);

          // ----- Create response object, store volunteer in DB, and send responseObject ---- //
          savePackageAndSendResponseForAdd(res, volunteer, configResponseObject.newConfig);
        }
      );
    }
  }

  // No new language added
  else {
    // ----- Create response object, store volunteer in DB, and send responseObject ---- //
    console.log('no new language added.  package and send response for add');
    // console.log('yoyo volunteer: ', volunteer);
    // create a config object so it is not undefined when calling packageAndSendResponseForAdd()
    var config = null;
    savePackageAndSendResponseForAdd(res, volunteer, config);
  }
}

module.exports.volunteersReadOne = function(req, res) {
  console.log('---app_api: volunteersReadOne()');

  Volunteer.findById(req.params.volunteerId).exec(function(err, volunteer){
    // Volunteers not found.  NULL
    if (!volunteer) {
      sendJsonResponse(res, 404, { messages: "volunteerID not found"});
      return;
    }

    // DB error
    else if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    // Send the volunteer list
    else {
      sendJsonResponse(res, 200, volunteer);
    }
  });
}


module.exports.volunteersList = function(req, res) {
  console.log('---app_api: volunteersList()');

  Volunteer.find().exec(function(err, volunteers){
    // Volunteers not found.  NULL
    if (!volunteers) {
      sendJsonResponse(res, 404, { messages: "volunteers not found"});
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

module.exports.volunteersEditOne = function(req, res) {
  console.log('---app_api: volunteersEditOne()');
  // TODO
  var volunteer = {
    dood: "dood"
  };
  sendJsonResponse(res, 200, volunteer);
};
