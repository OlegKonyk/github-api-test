var request = require("request-promise");//require('superagent');//require("request");
var reporters = require('jasmine-reporters');
var terminalReporter = new reporters.TerminalReporter({
            verbosity: 3,
            color: true/*,
            showStack: true*/
        });
jasmine.getEnv().addReporter(terminalReporter);
// var junitReporter = new reporters.JUnitXmlReporter({
//     savePath: '.',
//     consolidateAll: false
// });

var base_url = "https://api.github.com"

// describe("Hello World Server", function() {
//   describe("GET organization members", function() {
   
//     let responce;
//     beforeEach(function(done) {
//       var options = {
//         url: `${base_url}/orgs/google/members`,
//         headers: {
//           'User-Agent': 'request'
//         },
//         resolveWithFullResponse: true
//       };
//       request.get(options)
//         .then(function(res) {
//         responce = res;
//         responce.body = JSON.parse(responce.body);
//         //expect(res.statusCode).toBe(200);
//         done();
//       }, function(error) {
//         //expect(error).toBeFalsy();
//         done();
//       });
//     });

//     it("returns status code 200", function(done) {
//       expect(responce.statusCode).toBe(200);
//     });

//     it("body has length", function() {
//       expect(responce.body.length).toBeTruthy();
//     });
//   });
// });

describe("Hello World Server", function() {
  describe("GET user by uer name", function() {
   
    let responce;
    beforeEach(function(done) {
      var options = {
        url: `${base_url}/users/OlegKonyk`,
        headers: {
          'User-Agent': 'request'
        },
        resolveWithFullResponse: true
      };
      request.get(options)
        .then(function(res) {
        responce = res;
        responce.body = JSON.parse(responce.body);
        done();
      }, function(error) {
        console.log(error)
        done();
      });
    });

    it("returns status code 200", function() {
      expect(responce.statusCode).toBe(200);
    });

    it("login name matches", function() {
      expect(responce.body.login).toBe('OlegKonyk');
    });
  });
});