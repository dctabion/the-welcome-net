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
      sendJsonResponse(res, 200, config);
    }
  });
};

// -- These functions handle adding new item to the configurable lists for registration -- //
// --------------------------------------------------------------------------------------- //
module.exports.addNewLanguage = function(req, res) {
  console.log('---app_api: addNewLanguage()');
  console.log('req.params: ', req.params);

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
      // No DB err.  Found config_array
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
          // successfully saved new config to DB
          else {
            // package response object
            var newLanguage;
            newLanguage = newConfig.languages[newConfig.languages.length - 1];
            console.log("in options-API: newLanguage: ", newLanguage);
            sendJsonResponse(res, 200, newLanguage);
          }
        });
      }
    });
  }
};



module.exports.addNewAffiliation = function(req, res) {
  console.log('---app_api: addNewAffiliation()');
  console.log('req.params: ', req.params);

  // No language in request body
  if (!req.params.affiliation) {
    sendJsonResponse(res, 404, {
      "message": "request does not have an affiliation to add in params"
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
      // No DB err.  Found config_array
      // add subdocument and save
      else {
        var config = config_array[0];
        var newAffiliation = { displayText: req.params.affiliation };

        // add config to parent doc & save to DB
        config.affiliations.push(newAffiliation);

        // save config and send response object
        config.save(function(err, newConfig){
          if (err) {
            sendJsonResponse(res, 500, err);
          }
          // successfully saved new config to DB
          else {
            // package response object
            var newAffiliation;
            newAffiliation = newConfig.affiliations[newConfig.affiliations.length - 1];
            console.log("in options-API: newAffiliation: ", newAffiliation);
            sendJsonResponse(res, 200, newAffiliation);
          }
        });
      }
    });
  }
};

module.exports.addNewOpportunity = function(req, res) {
  console.log('---app_api: addNewOpportunity()');
  console.log('req.params: ', req.params);

  // No language in request body
  if (!req.params.opportunity_category) {
    sendJsonResponse(res, 404, {
      "message": "request does not have an opportunity to add in params"
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
      // No DB err.  Found config_array
      // add subdocument and save
      else {
        var config = config_array[0];
        var newOpportunityCategory = { displayText: req.params.opportunity_category };

        // add config to parent doc & save to DB
        config.opportunityCategories.push(newOpportunityCategory);

        // save config and send response object
        config.save(function(err, newConfig){
          if (err) {
            sendJsonResponse(res, 500, err);
          }
          // successfully saved new config to DB
          else {
            // package response object
            var newOpportunityCategory;
            newOpportunityCategory = newConfig.opportunityCategories[newConfig.opportunityCategories.length - 1];
            console.log("in options-API: newOpportunityCategory: ", newOpportunityCategory);
            sendJsonResponse(res, 200, newOpportunityCategory);
          }
        });
      }
    });
  }
};

module.exports.deleteConfigField = function(req, res) {
  console.log('---app_api: deleteSubDoc()');

  var errMsg = "";

  // No fieldType
  if (!req.params.fieldType) {
    errMsg = errMsg + "No Field Type.";
  }

  // No fieldId
  if (!req.params.fieldId) {
    errMsg = errMsg + "No Field Id"
  }

  // if a field is missing from params, send error response
  if (errMsg.length > 0) {
    sendJsonResponse(res, 404, {
      "message": errMsg
    });
  }

  // Try to delete subdoc
  else {
    // pull params from request
    var fieldType = req.params.fieldType;
    var fieldId = req.params.fieldId;
    console.log('fieldType: ', fieldType);
    console.log('fieldId: ', fieldId);

    ConfigOptions.find(function(err, config_array){
      // DB error
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else if (!config_array) {
        sendJsonResponse(res, 400, { "message" : "No config found!"});
      }
      // No DB err.  Found config_array
      // add subdocument and save
      else {
        var config = config_array[0];
        // var codeString = "config." + fieldType + ".id(\"" + fieldId + "\").remove()";
        // console.log(codeString);
        // eval(codeString);
        // console.log("config: ", config);
        console.log("fieldId: ", fieldId);
        console.log(config.affiliations.id(fieldId));


        // TODO need error trappings for idnotfound!!
        var commandString = "config." + fieldType + ".id(fieldId).remove()";
        console.log("commandString: ", commandString);

        // config.affiliations.id(fieldId).remove();
        eval(commandString);

        config.save(function(err){
          if (err) {
            console.log('Error: could not save the config!');
            sendJsonResponse(res, 404, err);
          }
          else {
            console.log('removed & saved');
            sendJsonResponse(res, 204, null);
          }
        });
      }

      // sendJsonResponse(res, 200, { "dood": "dood" });
    });
  }
};

  //
  //
  //
  //
  //
  //
  //       var newOpportunityCategory = { displayText: req.params.opportunity_category };
  //
  //       // add config to parent doc & save to DB
  //       config.opportunityCategories.push(newOpportunityCategory);
  //
  //       // save config and send response object
  //       config.save(function(err, newConfig){
  //         if (err) {
  //           sendJsonResponse(res, 500, err);
  //         }
  //         // successfully saved new config to DB
  //         else {
  //           // package response object
  //           var newOpportunityCategory;
  //           newOpportunityCategory = newConfig.opportunityCategories[newConfig.opportunityCategories.length - 1];
  //           console.log("in options-API: newOpportunityCategory: ", newOpportunityCategory);
  //           sendJsonResponse(res, 200, newOpportunityCategory);
  //         }
  //       });
  //     }
  //   });
  // }
