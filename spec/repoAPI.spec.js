var request = require("request-promise");
var gitHub = require('./lib/common');

var reporters = require('jasmine-reporters');
var path = require('path');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;


    // var terminalReporter = new reporters.TerminalReporter({
    //     verbosity: 3,
    //     color: true
    // });
    // jasmine.getEnv().addReporter(terminalReporter);

    
    var htmlReporter = new HtmlReporter({
        path: path.join(__dirname,'../HTMLresults')
    })
    jasmine.getEnv().addReporter(htmlReporter);

var reporters = require('jasmine-reporters');
var path = require('path');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;


beforeAll(function () {
    var terminalReporter = new reporters.TerminalReporter({
        verbosity: 3,
        color: true
    });
    jasmine.getEnv().addReporter(terminalReporter);

    
    var htmlReporter = new HtmlReporter({
        path: path.join(__dirname,'../../HTMLresults')
    })
    jasmine.getEnv().addReporter(htmlReporter);
});



describe("Repository APIs", function() {
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

    it("getting one", function() {
      expect(this.responce.body.length).toBe(1);
    });

  });

  describe("REPO | Creating new repository", function() {
    beforeAll(function(done) {
      this.newProject = {
        name: "Test_Project_7",
        description: "My cool repo",
        homepage: "truejs.com"
      }
      gitHub.post('/user/repos', auth=true, this.newProject)
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
      expect(this.responce.body.name).toBe(this.newProject.name);
      expect(this.responce.body.description).toBe(this.newProject.description);
      expect(this.responce.body.homepage).toBe(this.newProject.homepage);
    });

  });

  fdescribe("REPO | Deleting repository", function() {
    beforeAll(function(done) {
      gitHub.remove('/repos/testSystemAccount/Test-Project_3', auth=true)
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



