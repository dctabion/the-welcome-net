var mongoose = require('mongoose');
var ConfigOptions = mongoose.model('My_app_config');

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


module.exports.addNewLanguage = function(req, res) {
  console.log('---app_api: createNewLanguage()');
  console.log('req.params: ', req.params);

  configResponseObject = {};

  // No language in request body
  if (!req.params.language) {
    sendJsonResponse(res, 404, {
      "message": "request does not have a language to add in params"
    });
  }
  else {
    // package new language in response object
    configResponseObject.newLanguage = req.params.language;

    ConfigOptions.find(function(err, config_array){
      // DB error
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else if (!config_array) {
        sendJsonResponse(res, 400, { "message" : "No config found!"});
      }
      // No DB err
      else {
        configResponseObject.newConfig = config_array[0];
        // console.log('req.params.language:', req.params.language );
        // console.log("config: ", config);
        configResponseObject.newConfig.languages.push({ displayText: req.params.language });
        configResponseObject.newConfig.save(function(err, config){
          if (err) {
            sendJsonResponse(res, 404, err);
          }
          else {
            sendJsonResponse(res, 200, configResponseObject);
          }
        });
      }
    });
  }
}
