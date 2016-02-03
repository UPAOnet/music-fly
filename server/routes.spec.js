var expect = require('Chai').expect;
var request = require('request');

describe('Check if Spotify API track search works', function () {
  it('should return a track', function (done) {
    request('https://api.spotify.com/v1/tracks/22mek4IiqubGD9ctzxc69s', 
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    )
  })
})