var request = require('request-promise');
var gitHub = require('./utils/gitHub')

var reporters = require('jasmine-reporters');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
var path = require('path');

var terminalReporter = new reporters.TerminalReporter({
        verbosity: 3,
        color: true
    });
jasmine.getEnv().addReporter(terminalReporter);

var htmlReporter = new HtmlReporter({
    path: path.join(__dirname,'../HTMLresults')
})
jasmine.getEnv().addReporter(htmlReporter);


describe('Users API', function() {

    describe("GET user by user name (non auth)", function() {
        var response;
        beforeAll(function(done) {
            gitHub.get('/users/' + gitHub.userName, auth=false)
                .then(res => {
                    response = res;
                    done();
                }, err => {
                    console.log(err)
                    done();
                });
        })

        it('returns status code 200', function() {
            expect(response.statusCode).toBe(200);
        });

        it("login name matches", function() {
            expect(response.body.login).toBe(gitHub.userName);
        });
    });

    describe("GET User data for authenticated user", function() {
        var response;
        beforeAll(function(done) {
            gitHub.get('/user', auth=true)
                .then(res => {
                    response = res;
                    done();
                }, err => {
                    console.log(err)
                    done();
                });
        })

        it("returns status code 200", function() {
            expect(response.statusCode).toBe(200);
        });

        it("disk_usage avalible", function() {
            expect(response.body.disk_usage).not.toBeUndefined();
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