// Read in config file
var mongoose = require('mongoose');
var My_app_config = mongoose.model('My_app_config');

var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://morning-scrubland-42645.herokuapp.com";
}


module.exports.addVolunteer = function(req, res) {
  console.log('---app_server: addVolunteer()');

  My_app_config.find().exec(function(err, config_array){
    // Volunteers not found.  NULL
    if (!config_array) {
      console.log("options not found in DB");
    }

    // DB error
    else if (err) {
      console.log(err);
    }

    // Store config params
    else {
      global.my_app_config = config_array[0];

      console.log('Options config read successfully.  global.my_app_config: ');
      console.log(global.my_app_config);
    }
  });

  res.render('register', {
    title: 'VOLUNTEER REGISTRATION',
    affiliations: global.my_app_config.affiliations,
    hear_abouts: global.my_app_config.hear_abouts,
    languages: global.my_app_config.languages,
    how_oftens: global.my_app_config.how_oftens,
    times_of_day: global.my_app_config.times_of_day,
    opportunity_categories: global.my_app_config.opportunity_categories
  });
};

module.exports.doAddVolunteer = function(req, res) {
  console.log('---app_server: doAddVolunteer()');

  console.log('======================');
  console.log('First Name: ' + req.body.first_name);
  console.log('Last Name: ' + req.body.last_name);
  console.log('Email: ' + req.body.email);
  console.log('Email List: ' + req.body.email_list);
  console.log('Cellphone Number: ' + req.body.cell_number);
  console.log('Home Phone Number: ' + req.body.home_number);

  // "undefined" = not checked; "on" - checked
  console.log('Opportunity Categories of Interest:');
  for (var i=0; i < global.my_app_config.opportunity_categories.length; i++) {
    // example variable name from form: language_1_croatian
    var opportunity_var_name = "req.body.opportunity_category_" + i.toString();
    console.log(i + ' ' + opportunity_var_name + ': ' + eval(opportunity_var_name));
  }

  console.log('Affiliation: ' + req.body.affiliation + ' ' + global.my_app_config.affiliations[req.body.affiliation]);
  console.log('Hear About Us: ' + req.body.hear_about_us + ' ' + global.my_app_config.hear_abouts[req.body.hear_about_us]);

  // "undefined" = not checked; "on" - checked
  console.log('Languages Spoken');
  for (var i=0; i < global.my_app_config.languages.length; i++) {
    // example variable name from form: language_1_croatian
    var language_var_name = "req.body.language_" + i.toString();
    console.log(i + ' ' + language_var_name + ': ' + eval(language_var_name));
  }

  console.log('Language Other: ' + req.body.language_other);

  console.log('How often: ' + req.body.how_often + ' ' + global.my_app_config.how_oftens[req.body.how_often]);

  // console.log('Times of day: ' + req.body.time_of_day + ' ' + times_of_day[req.body.time_of_day]);
  for (var i=0; i < global.my_app_config.times_of_day.length; i++) {
    var times_of_day_var_name = "req.body.times_of_day_" + i.toString();
    console.log(i + ' ' + times_of_day_var_name + ":" + eval(times_of_day_var_name));
  }

  console.log('Reliable vehicle and able to drive: ' + req.body.reliable_transportation);
  console.log('Family participation: ' + req.body.family_participation);

  console.log('======================');

  // Validate
  // ??????

  // Make request to API to store data
  var requestOptions, path;
  path = '/api/volunteers';
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: req.body,
    qs: {
      // query string
    }
  };

  request(
    requestOptions,
    function(err, response, body) {
      console.log('---callback: Receive response from API call');

      res.render('register_confirmation', {
        title: "Registration Confirmation",
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });

    });
};

module.exports.getVolunteerList = function(req, res) {
  console.log("---app_server: getVolunteerList()");

  var requestOptions, path;
  path = '/api/volunteers';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      // query string
    }
  };

  request(
    requestOptions,
    function(err, response, body) {
      console.log('---callback: Receive response from API call');
      console.log('body: ', body);
      // renderVolunteerList(body); -- maybe don't need this helper
      res.render('volunteerList', {
        title: 'Volunteer List',
        // pageHeader: {
        //   title: 'Loc8r',
        //   strapline: 'Find places to work with wifi near you!'
        // },
        volunteers: body
      });
    });
};
