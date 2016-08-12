var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer')

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}


module.exports.volunteersCreate = function(req, res) {
  var dummy1 = [1, 2];
  var dummy2 = [2, 3];
  var dummy3 = [1, 1, 3];
  var volunteer = {};

  Volunteer.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    cell_number: req.body.cell_number,
    home_number: req.body.home_number,
    email: req.body.email,
    subscribe: req.body.subscribe,
    opportunity_categories: dummy1,
    languages: dummy2,
    language_other: req.body.language_other,
    how_often: req.body.how_often,
    times_of_day: dummy3,
    reliable_transportation: req.body.reliable_transportation,
    family_participation: req.body.family_participation,
    affiliation: req.body.affiliation,
    hear_about_us: req.body.hear_about_us
  },
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

// var mongoose = require('mongoose');
// var Loc = mongoose.model('Location')
//
// var sendJsonResponse = function(res, status, content) {
//   res.status(status);
//   res.json(content);
// }
//
// module.exports.reviewsCreate = function(req, res) {
//   sendJsonResponse(res, 200, {"status" : "success"});
// };
//
//
// module.exports.reviewsReadOne = function(req, res) {
//   console.log("reviewsReadOne: ", req.params);
//
//   // if there are params and a locationid in the params & a reviewid in the paras
//   if(req.params && req.params.locationid && req.params.reviewid) {
//     // find the location document
//     Loc.findById(req.params.locationid).select('name reviews').exec(function(err, location){
//       var response, review;
//
//       // Location ID not found
//       if(!location) {
//         sendJsonResponse(res, 404, { messages: "locationid not found"});
//         return;
//       }
//       // DB error
//       else if (err) {
//         sendJsonResponse(res, 404, err);
//         return;
//       }
//
//       // Location document has review attribute & a review exists
//       if (location.reviews && location.reviews.length > 0) {
//         review = location.reviews.id(req.params.reviewid);
//         console.log("location.reviews: ", location.reviews);
//         console.log("req.params.reviewid: ", req.params.reviewid);
//         console.log("review: ", review);
//
//         // Review is NULL
//         if (!review) {
//           sendJsonResponse(res, 404, {
//             "message": "reviewid not found"
//           });
//         }
//         // Review is not NULL.  Build & Send response
//         else {
//           response = {
//             location: {
//               name: location.name,
//               id: req.params.locationid
//             },
//             review: review
//           };
//           sendJsonResponse(res, 200, response);
//         }
//       }
//       // No reviews found in location document
//       else {
//         sendJsonResponse(res, 404, {
//           "message": "No reviews found"
//         });
//       }
//     });
//   }
