var mongoose = require('mongoose');
var Options = mongoose.model('OptionsConfig');

// module.exports.readConfig = function(req, res) {
//   Options.find().exec(function(err, options){
//     // Volunteers not found.  NULL
//     if (!options) {
//       sendJsonResponse(res, 404, { messages: "options not found"});
//       return;
//     }
//
//     // DB error
//     else if (err) {
//       sendJsonResponse(res, 404, err);
//       return;
//     }
//
//     // Send the volunteer list
//     else {
//       sendJsonResponse(res, 200, volunteers);
//     }
//   });
// }
