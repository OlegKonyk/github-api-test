var request = require("request-promise");
var gitHub = require('./lib/common');

var reporters = require('jasmine-reporters');
var path = require('path');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;    
var htmlReporter = new HtmlReporter({
    path: path.join(__dirname,'../HTMLresults')
})
jasmine.getEnv().addReporter(htmlReporter);


// beforeAll(function () {
//     var terminalReporter = new reporters.TerminalReporter({
//         verbosity: 3,
//         color: true
//     });
//     jasmine.getEnv().addReporter(terminalReporter);

    
//     var htmlReporter = new HtmlReporter({
//         path: path.join(__dirname,'../../HTMLresults')
//     })
//     jasmine.getEnv().addReporter(htmlReporter);
// });

describe("Repository APIs", function() {
  
  let newProject = {
    name: "Test_Project",
    description: "My cool repo",
    homepage: "truejs.com"
  };

  describe("REPO | Creating new repository", function() {
    beforeAll(function(done) {
      gitHub.post('/user/repos', auth=true, newProject)
        .then(res => {
          this.responce = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("Returns status code 201", function() {
      expect(this.responce.statusCode).toBe(201);
    });

    it("Properties are matching", function() {
      expect(this.responce.body.name).toBe(newProject.name);
      expect(this.responce.body.description).toBe(newProject.description);
      expect(this.responce.body.homepage).toBe(newProject.homepage);
    });
  });

  describe("GET repositiries list", function() {
    beforeAll(function(done) {
      gitHub.get('/user/repos', auth=true)
        .then(res => {
          this.responce = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("returns status code 200", function() {
      expect(this.responce.statusCode).toBe(200);
    });

    it("One repository exists", function() {
      expect(this.responce.body.length).toBe(1);
    });

  });


  describe("REPO | Deleting repository", function() {
    beforeAll(function(done) {
      gitHub.remove(`/repos/${gitHub.accountName}/${newProject.name}`, auth=true)
        .then(res => {
          this.responce = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("Returns status code 204", function() {
      expect(this.responce.statusCode).toBe(204);
    });

  });


});



