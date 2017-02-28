var request = require('request-promise');

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