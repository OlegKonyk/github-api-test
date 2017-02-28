var request = require('request-promise');

/* In order to attach reporters we need
   npm install --save jasmine-reporters jasmine-pretty-html-reporter
*/
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

var userName = "testSystemAccount"

describe('Users API', function() {

    var response;
    beforeAll(function(done) {
        var options = {
            uri: 'https://api.github.com/users/' + userName,
            headers: {
                'User-Agent': 'request'
            },
            resolveWithFullResponse: true,
            json: true
        };

        request.get(options)
            .then(function(res) {
                response = res;
                done();
            }, function(err) {
                done();
            });
    })

    it('returns status code 200', function() {
        expect(response.statusCode).toBe(200);
    });

    it("login name matches", function() {
      expect(response.body.login).toBe(userName);
    });
});