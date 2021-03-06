var request = require('request-promise');
const base_url = "https://api.github.com";
const userName = "testSystemAccount"
const userData = {
      name: "Jastin Biber",
      blog: "https://www.jasbib.com",
      company: "Jastin Biber & Co."
    };

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

function patch(endpoint, auth, body) {
  var options = {
    url: base_url + endpoint,
    headers: {
      'User-Agent': 'request'
    },
    body: body,
    resolveWithFullResponse: true,
    json: true
  };
  if(auth) {
    options.headers['Authorization'] = 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64');
  }
  
  return request.patch(options)
};

function post(endpoint, auth, body) {
  var options = {
    url: base_url + endpoint,
    headers: {
      'User-Agent': 'request'
    },
    body: body,
    resolveWithFullResponse: true,
    json: true
  };
  if(auth) {
    options.headers['Authorization'] = 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64');
  }
  
  return request.post(options)
};

function remove(endpoint, auth, body) {
  var options = {
    url: base_url + endpoint,
    headers: {
      'User-Agent': 'request'
    },
    body: body,
    resolveWithFullResponse: true,
    json: true
  };
  if(auth) {
    options.headers['Authorization'] = 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64');
  }
  
  return request.delete(options)
};


module.exports = { userName, userData, get, patch, post, remove};