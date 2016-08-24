var mongoose = require('mongoose');
var ConfigOptions = mongoose.model('My_app_config');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}


module.exports.addNewLanguage = function(req, res) {
  console.log('---app_api: createNewLanguage()');

  console.log('req.params: ', req.params);

  // No language in request body
  if (!req.params.language) {
    sendJsonResponse(res, 404, {
      "message": "request does not have a language to add in params"
    });
  }
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
      else {
        var config = config_array[0];

        console.log("config: ", config);
        config.languages.push(req.params.language);
        config.save(function(err, config){
          if (err) {
            sendJsonResponse(res, 404, err);
          }
          else {
            sendJsonResponse(res, 200, config);
          }
        });
      }
    });
  }
}
