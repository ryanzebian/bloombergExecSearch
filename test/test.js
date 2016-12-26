var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var URL_ROOT = 'http://localhost:3000';

describe('CEO API', function () {
    var server;
    before(function () {
        var app = express();
        app.use(require('./../api'));
        server = app.listen(3000);
    });
    after(function () {
        //shutdown the server
        server.close();
    });
    it('can get bloomberg URL', function (done) {
        var url = URL_ROOT + '/findCEO/' + encodeURI('Ray B. Mundt');
        superagent.get(url, function (err, res) {
            assert.ifError(err);
            assert.equal(res.status, 200);
            var result;
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            assert.equal(result[0].toString()
                , "http://www.bloomberg.com/research/stocks/private/person.asp?personId=673018&privcapId=345542");
            done();
        });
    });

    it('can get CEO description', function (done) {
        var url = URL_ROOT + '/bloomberg?personId=673018&privcapId=345542';
        superagent.get(url, function (err, res) {
            assert.ifError(err);
            assert.equal(res.status, 200);
            var result;
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            assert.equal(result.description.toString().length
             ,959 );
            done();
        });

    });
});