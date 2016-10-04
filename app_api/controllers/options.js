var mongoose = require('mongoose');
var ConfigOptions = mongoose.model('My_app_config');
var Language = mongoose.model('Language')

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.readAppConfig = function(req, res) {
  console.log('---app_api: readAppConfig()');

  // Read Configuration from DB in case categories have changed
  ConfigOptions.find().exec(function(err, config_array){
    // Volunteers not found.  NULL
    if (!config_array) {
      console.log("Application could not be configured!!!");
      console.log("options not found in DB");
    }

    // DB error
    else if (err) {
      console.log("Application could not be configured!!!");
      console.log(err);
    }

    // Store config params
    else {
      console.log('Options config read successfully.');
      var config = config_array[0];
      // console.log('config: ', config);
      sendJsonResponse(res, 200, config);
    }
  });
}

// -- These functions handle adding new item to the configurable lists for registration -- //
// --------------------------------------------------------------------------------------- //
module.exports.addNewLanguage = function(req, res) {
  console.log('---app_api: addNewLanguage()');
  console.log('req.params: ', req.params);

  configResponseObject = {};

  // No language in request body
  if (!req.params.language) {
    sendJsonResponse(res, 404, {
      "message": "request does not have a language to add in params"
    });
  }
  // request has new language
  else {
    ConfigOptions.find(function(err, config_array){
      // DB error
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else if (!config_array) {
        sendJsonResponse(res, 400, { "message" : "No config found!"});
      }
      // No DB err
      // add subdocument and save
      else {
        var config = config_array[0];
        var newLanguage = { displayText: req.params.language };
        // console.log('language object to store.  newLanguage: ', newLanguage);

        // add config to parent doc & save to DB
        config.languages.push(newLanguage);

        // save config and send response object
        config.save(function(err, newConfig){
          if (err) {
            sendJsonResponse(res, 500, err);
          }
          else {
            // console.log("newConfig: ", newConfig);
            // console.log("newConfig.languages: ", newConfig.languages);
            // console.log("new Language: ", newConfig.languages[newConfig.languages.length - 1]);

            // package response object
            var configResponseObject = {};
            configResponseObject.newConfig = newConfig;
            configResponseObject.newLanguage = newConfig.languages[newConfig.languages.length - 1]._id;
            console.log("in options-API: configResponseObject.newLanguage: ", configResponseObject.newLanguage);
            sendJsonResponse(res, 200, configResponseObject);
          }
        });
      }
    });
  }
}


module.exports.addNewAffiliation = function(req, res) {
  console.log('---app_api: addNewAffiliation()');
  console.log('req.params: ', req.params);

  configResponseObject = {};

  // No language in request body
  if (!req.params.language) {
    sendJsonResponse(res, 404, {
      "message": "request does not have a language to add in params"
    });
  }
  // request has new language
  else {
    ConfigOptions.find(function(err, config_array){
      // DB error
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else if (!config_array) {
        sendJsonResponse(res, 400, { "message" : "No config found!"});
      }
      // No DB err
      // add subdocument and save
      else {
        var config = config_array[0];
        var newLanguage = { displayText: req.params.language };
        // console.log('language object to store.  newLanguage: ', newLanguage);

        // add config to parent doc & save to DB
        config.languages.push(newLanguage);

        // save config and send response object
        config.save(function(err, newConfig){
          if (err) {
            sendJsonResponse(res, 500, err);
          }
          else {
            // console.log("newConfig: ", newConfig);
            // console.log("newConfig.languages: ", newConfig.languages);
            // console.log("new Language: ", newConfig.languages[newConfig.languages.length - 1]);

            // package response object
            var configResponseObject = {};
            configResponseObject.newConfig = newConfig;
            configResponseObject.newLanguage = newConfig.languages[newConfig.languages.length - 1]._id;
            console.log("in options-API: configResponseObject.newLanguage: ", configResponseObject.newLanguage);
            sendJsonResponse(res, 200, configResponseObject);
          }
        });
      }
    });
  }
}
