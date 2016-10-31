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

module.exports.volunteersCreate = function(req, res) {
  console.log('---app_api: volunteersCreate()');

  //------- Create and fill volunteer object ------//
  var volunteer = req.body;
  console.log('volunteer = req.body:');
  console.log(volunteer);
  // savePackageAndSendResponseForAdd(res, volunteer, config);
  Volunteer.create(volunteer,
    function(err, volunteer) {
      if (err) {
        console.log('error creating volunteer! err: ', err);
        sendJsonResponse(res, 400, err);
      }
      else {
        console.log('created new volunteer!');
        sendJsonResponse(res, 201, volunteer);
      }
    }
  );
};

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

  var volunteerNew = req.body;
  console.log('volunteerNew = req.body:');
  console.log(volunteerNew);
  console.log('req.params.volunteerId:', req.params.volunteerId);
  // savePackageAndSendResponseForAdd(res, volunteer, config);
  Volunteer.findById(req.params.volunteerId).exec(
    function(err, volunteerOld) {
      console.log("volunteerOld:", volunteerOld);
      volunteerOld.firstName = volunteerNew.firstName;
      volunteerOld.lastName = volunteerNew.lastName;
      volunteerOld.cellNumber = volunteerNew.cellNumber;
      volunteerOld.homeNumber = volunteerNew.homeNumber;
      volunteerOld.email = volunteerNew.email;
      volunteerOld.subscribe = volunteerNew.subscribe;
      volunteerOld.opportunityCategories = volunteerNew.opportunityCategories;
      volunteerOld.languages = volunteerNew.languages;
      volunteerOld.howOften = volunteerNew.howOften;
      volunteerOld.timesOfDay = volunteerNew.timesOfDay;
      volunteerOld.reliableTransportation = volunteerNew.reliableTransportation;
      volunteerOld.familyParticipation = volunteerNew.familyParticipation;
      volunteerOld.affiliation = volunteerNew.affiliation;
      volunteerOld.hearAboutUs = volunteerNew.hearAboutUs;
      volunteerOld.admin = volunteerNew.admin;
      volunteerOld.donorStatus = volunteerNew.donorStatus;

      volunteerOld.save(function(err, volunteer){
        if (err) {
          sendJsonResponse(res, 404, err);
        }
        else {
          sendJsonResponse(res, 200, volunteer);
        }
      });
    }
  );
};
