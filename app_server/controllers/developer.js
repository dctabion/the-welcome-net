var request = require('request');

var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://morning-scrubland-42645.herokuapp.com";
}

/* GET home page */
module.exports.doReconfig = function(req, res, next) {
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

  res.render('developerReconfigure', { title: 'Reconfiguring App' });


};