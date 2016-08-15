var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer')

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}


module.exports.volunteersCreate = function(req, res) {
  console.log('req.body:');
  console.log(req.body);

  var variable_name = "";

  // Create and fill volunteer object
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
  // console.log('opportunity_categories: ', volunteer.opportunity_categories);

  // Languages
  volunteer.languages = [];
  for (var i = 0; i < global.my_app_config.languages.length; i++) {
    variable_name = "req.body.language_" + parseInt(i);
    if ( eval(variable_name) == "on") {
      volunteer.languages.push(i);
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

  volunteer.affiliation = req.body.affiliation;
  volunteer.hear_about_us = req.body.hear_about_us;

  Volunteer.create(volunteer,
    function(err, location) {
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else {
        sendJsonResponse(res, 201, location);
      }
    });
}

module.exports.volunteersReadOne = function(req, res) {
  // sendJsonResponse(res, 200, "Sweet");
}

module.exports.volunteersListAll = function(req, res) {
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
