var expect = require('Chai').expect;
var request = require('request');
var fs = require('fs');

describe('Check if Spotify API track search works', function () {
  it('return a track'), function (done) {
    var track = '22mek4IiqubGD9ctzxc69s'
    request('https://api.spotify.com/v1/tracks/22mek4IiqubGD9ctzxc69s' + track, 
      function (error, response, body) {
        expect(res.statusCode).to.equal(200);
        done();
      }
    )
  }
})