var request = require("request-promise");//require('superagent');//require("request");
// var reporters = require('jasmine-reporters');
// var path = require('path');
// var terminalReporter = new reporters.TerminalReporter({
//             verbosity: 3,
//             color: true
//         });
// jasmine.getEnv().addReporter(terminalReporter);

// var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
// var htmlReporter = new HtmlReporter({
//   path: path.join(__dirname,'../HTMLresults')
// })
// jasmine.getEnv().addReporter(htmlReporter);

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

describe("Users APIs", function() {
  describe("GET user by user name (non auth)", function() {
   
    let responce;
    beforeEach(function(done) {

      var options = {
        url: `${base_url}/users/testSystemAccount`,
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
      expect(responce.body.login).toBe('testSystemAccount');
    });
  });


  describe("Basic authentication", function() {
    let responce;

    beforeEach(function(done) {
      var options = {
        url: `${base_url}/users/testSystemAccount`,
        headers: {
          'User-Agent': 'request',
          'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
        },
        resolveWithFullResponse: true
      };

      request.get(options)
        .then(function(res) {
          responce = res;
          responce.body = JSON.parse(responce.body);
          done();
        }, function(error) {
          //console.log(error)
          done();
        });
      });

    it("disk_usage avalible", function() {
      expect(responce.body.disk_usage).not.toBeUndefined();
    });
  });

  describe("Update users data", function() {
    let responce;

    beforeEach(function(done) {
      var options = {
        url: `${base_url}/user`,
        headers: {
          'User-Agent': 'request',
          'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
        },
        json: true,
        body: {
          name: "monalisa octocat",
          //"email": "octocat@github.com",
          blog: "https://github.com/blog",
          company: "GitHub",
          location: "San Francisco",
          hireable: true,
          bio: "There once..."
        },
        resolveWithFullResponse: true
      };

      request.patch(options)
        .then(function(res) {
          responce = res;
          responce.body = responce.body;
          //console.log("||||", res.body)
          done();
        }, function(error) {
          console.log(error)
          done();
        });
      });

    it("disk_usage avalible", function() {
      expect(responce.body.company).toBe('GitHub');
    });
  });

});