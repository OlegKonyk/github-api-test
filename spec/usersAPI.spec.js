var request = require("request-promise");
var gitHub = require('./utils/gitHub');

describe("Users API", function() {

  describe("GET User data by user name (non auth)", function() {
    beforeAll(function(done) {
      gitHub.get(`/users/${gitHub.userName}`, auth=false)
        .then(res => {
          this.response = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("returns status code 200", function() {
      expect(this.response.statusCode).toBe(200);
    });

    it("login name matches", function() {
      expect(this.response.body.login).toBe('testSystemAccount');
    });

  });


  describe("GET User data for authenticated user", function() {

    beforeAll(function(done) {
      gitHub.get('/user', auth=true)
        .then(res => {
          this.response = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("returns status code 200", function() {
      expect(this.response.statusCode).toBe(200);
    });

    it("disk_usage avalible", function() {
      expect(this.response.body.disk_usage).not.toBeUndefined();
    });

  });

  describe("Update users data", function() {
    
    var updateData = {
      name: "John Bon Jovi",
      blog: "https://www.bonjovi.com",
      company: "BonJovi"
    };

    beforeAll(function(done) {
      gitHub.patch(`/user`, auth=true, updateData)
        .then(res => {
          this.response = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

    it("returns status code 200", function() {
      expect(this.response.statusCode).toBe(200);
    });

    it("name is matching", function() {
      expect(this.response.body.name).toBe(updateData.name);
    });

    it("blog is matching", function() {
      expect(this.response.body.blog).toBe(updateData.blog);
    });

    it("company is matching", function() {
      expect(this.response.body.company).toBe(updateData.company);
    });

    afterAll(function(done) {
      gitHub.patch(`/user`, auth=true, gitHub.userData)
        .then(res => {
          this.response = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

  });

});