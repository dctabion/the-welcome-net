var request = require('request');

var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.APP_URL;
}

/* GET home page */
module.exports.doReconfig = function(req, res, next) {
  console.log('---app_server: doReconfig()');
  console.log('Reconfiguring Application!')

  var requestOptions, path;
  path = '/api/config';
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
    function(err, response, config) {
      console.log('---callback: app_server received response from API call');
      // console.log('config: ', config);
      // console.log('Before storing: global.my_app_config: ', global.my_app_config);

      // Configure the app (store in globals)
      global.myAppConfig.opportunityCategories = config.opportunityCategories;
      global.myAppConfig.timesOfDay = config.timesOfDay;
      global.myAppConfig.howOftens = config.howOftens;
      global.myAppConfig.languages = config.languages;
      global.myAppConfig.hearAbouts = config.hearAbouts;
      global.myAppConfig.affiliations = config.affiliations;

      // console.log('After storing: global.myAppConfig: ', global.myAppConfig);
      console.log('Intial app configuration complete!');
    }
  );

  res.render('developer_confirmation', { title: 'Reconfigured the application' });


};

module.exports.doDumpConfig = function(req, res) {
  console.log('---app_server: doDumpConfig()');
  console.log('global.myAppConfig: ', global.myAppConfig);
  res.render('developer_confirmation', { title: 'Configuration Dumped'})
};

module.exports.doDumpVolunteers = function(req, res) {
  console.log('---app_server: doDumpVolunteers()');

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
    function(err, response, volunteers) {
      // TODO add error catching
      console.log('---callback: app_server received response from API call');
      console.log('volunteers: ', volunteers);
      res.render('developer_confirmation', { title: 'Volunteers Dumped'})
    }
  );
};
