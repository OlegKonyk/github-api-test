var request = require("request-promise");

var base_url = "https://api.github.com"
var lib = require('./lib/common')

fdescribe("Repository APIs", function() {
  describe("GET repositiries list", function() {
   
    let responce;
    beforeAll(function(done) {
      lib.requester('/user/repos')
        .then(function(res) {
          responce = res;
          done();
        }, function(err) {
          console.log(err)
          done();
        });
      // var options = {
      //   url: `${base_url}/user/repos`,
      //   headers: {
      //     'User-Agent': 'request',
      //     'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
      //   },
      //   resolveWithFullResponse: true,
      //   json: true
      // };

      // request.get(options)
      //   .then(function(res) {
      //     responce = res;
      //     console.log('>>>>>>>>>>>>>>', lib.common());
      //     done();
      //   }, function(error) {
      //     console.log(error)
      //     done();
      //   });

    });

    it("returns status code 200", function() {
      expect(responce.statusCode).toBe(200);
    });

    it("getting one", function() {
      expect(responce.body.length).toBe(1);
    });

  });


//   describe("Basic authentication", function() {
//     let responce;

//     beforeEach(function(done) {
//       var options = {
//         url: `${base_url}/users/testSystemAccount`,
//         headers: {
//           'User-Agent': 'request',
//           'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
//         },
//         resolveWithFullResponse: true
//       };

//       request.get(options)
//         .then(function(res) {
//           responce = res;
//           responce.body = JSON.parse(responce.body);
//           done();
//         }, function(error) {
//           //console.log(error)
//           done();
//         });
//       });

//     it("disk_usage avalible", function() {
//       expect(responce.body.disk_usage).not.toBeUndefined();
//     });
//   });

//   describe("Update users data", function() {
//     let responce;

//     beforeEach(function(done) {
//       var options = {
//         url: `${base_url}/user`,
//         headers: {
//           'User-Agent': 'request',
//           'Authorization': 'Basic ' + new Buffer('testSystemAccount' + ':' + 'test2017').toString('base64')
//         },
//         json: true,
//         body: {
//           name: "monalisa octocat",
//           //"email": "octocat@github.com",
//           blog: "https://github.com/blog",
//           company: "GitHub",
//           location: "San Francisco",
//           hireable: true,
//           bio: "There once..."
//         },
//         resolveWithFullResponse: true
//       };

//       request.patch(options)
//         .then(function(res) {
//           responce = res;
//           responce.body = responce.body;
//           //console.log("||||", res.body)
//           done();
//         }, function(error) {
//           console.log(error)
//           done();
//         });
//       });

//     it("disk_usage avalible", function() {
//       expect(responce.body.company).toBe('GitHub');
//     });
//   });

});



