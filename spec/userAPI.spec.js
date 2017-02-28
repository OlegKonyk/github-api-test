var request = require('request-promise');

describe('Users API', function() {
    it('returns status code 200', function(done) {
        /* We want to call https://api.github.com/users/YOUR_USER_NAME
           and verify that response code has status 200.
           In order to do this we need to make request.
           npm install --save request request-promise
        */
        var options = {
            uri: 'https://api.github.com/users/testSystemAccount',
            headers: {
                'User-Agent': 'request'
            },
            resolveWithFullResponse: true,
            json: true
        };

        request.get(options)
            .then(function(response) {
                expect(response.statusCode).toBe(200);
                done();
            }, function(err) {
                expect(true).toBe(false); // faling test
                done();
            });
    })
})