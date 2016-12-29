var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var google = require('google');
var Xray = require('x-ray');

google.resultsPerPage = 3;
google.requestOptions = {
    timeout: 1000
}
function setupRouting() {
    var api = express.Router();

    api.get('/findCEO/:id', function (req, res) {
        var result = req.params.id + ' Executive bloomberg';
        google(result, function (err, resu) {
            if (err) {
                return res.status(status.INTERNAL_SERVER_ERROR).
                    json({ error: err });
            }
            var links = [];
            resu.links.forEach(function (value) {
                if (value.href) {
                    if (value.href.search('bloomberg.com') != -1) {
                        if (value.href.search('personId') != -1)
                        { links.push(value.href); }
                    }
                }
            });
            // _.each(resu.links, function (value, key) {
            //     if (value.href) {
            //         if (value.href.search('bloomberg.com') != -1) {
            //             if (value.href.search('personId') != -1)
            //             { links.push(value.href); }
            //         }
            //     }
            // });
            res.send(links);
        });
    });

    api.get('/bloomberg', function (req, res) {
        var queryString = require('url').parse(req.url).query;
        var url = 'http://www.bloomberg.com/research/stocks/private/person.asp?' + queryString;

        var xray = new Xray();
        xray(url, 'div[itemprop]')(function (error, description) {
            if (error) {
                return res.status(status.BAD_REQUEST).
                    json({ error: error.toString() });
            }
            if (!res) {
                return res.status(status.NOT_FOUND).
                    json({ error: 'Not Found!' });
            }
            res.json({ description: description });

        });
    }
    );

    return api;
}

module.exports = setupRouting();

        // request(url, function (error, response, body) {
        //     if (error) {
        //         return res.status(status.BAD_REQUEST).
        //             json({ error: error.toString() });
        //     }
        //     if (!response) {
        //         return res.status(status.NOT_FOUND).
        //             json({ error: 'Not Found!' });
        //     }
        //     var result;
        //     var indexDiv = body.search('<div itemprop="description"');
        //     if (indexDiv !== -1) {
        //         var div = body.slice(indexDiv + 28);
        //         var indexClosingDiv = body.search('</div>');
        //         // result = div.slice(0, indexClosingDiv);
        //         res.send(div);

        //     } else {
        //         return res.status(status.NOT_FOUND).
        //             json({ error: 'Not Found!' });

        //     }
        // });