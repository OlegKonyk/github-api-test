var request = require('request-promise');
const base_url = "https://api.github.com";
const userName = "testSystemAccount"

function get(endpoint, auth) {
  
  var options = {
    url: base_url + endpoint,
    headers: {
      'User-Agent': 'request'
    },
    resolveWithFullResponse: true,
    json: true
  };
  if(auth) {
    options.headers['Authorization'] = 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64');
  }

  return request.get(options)
};

module.exports = { userName, get};