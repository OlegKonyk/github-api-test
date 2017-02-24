var request = require("request-promise");
var gitHub = require('./lib/common');

describe("Users API", function() {

  describe("GET user by user name (non auth)", function() {
    beforeAll(function(done) {
      gitHub.get(`/users/${gitHub.accountName}`, auth=false)
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

    it("login name matches", function() {
      expect(this.responce.body.login).toBe('testSystemAccount');
    });

  });


  describe("Basic authentication", function() {

    beforeAll(function(done) {
      gitHub.get('/user', auth=true)
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

    it("disk_usage avalible", function() {
      expect(this.responce.body.disk_usage).not.toBeUndefined();
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

    it("name is matching", function() {
      expect(this.responce.body.name).toBe(updateData.name);
    });

    it("blog is matching", function() {
      expect(this.responce.body.blog).toBe(updateData.blog);
    });

    it("company is matching", function() {
      expect(this.responce.body.company).toBe(updateData.company);
    });

    afterAll(function(done) {
      gitHub.patch(`/user`, auth=true, gitHub.userData)
        .then(res => {
          this.responce = res;
          done();
        }, err => {
          console.log(err)
          done();
        });
    });

  });

});