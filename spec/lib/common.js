var request = require("request-promise");

function requester(endpoint) {
      var base_url = "https://api.github.com"
      var options = {
        url: base_url + endpoint,
        headers: {
          'User-Agent': 'request',
          'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
        },
        resolveWithFullResponse: true,
        json: true
      };

      return request.get(options)
};

module.exports = {requester};