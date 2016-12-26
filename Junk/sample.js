// var htmlparser = require('htmlparser2');
// var body = require('./sampleData')();

var fs = require('fs');
var util = require('util');
var htmlparser = require('htmlparser2');
var request = require('request');

var parser = new htmlparser.Parser({
    onopentag: function (name, attribs) {
        if (name == "div" && attribs['itemprop'] === "description") {
            fs.writeFile('debug.json', require('util').inspect(this, { showHidden: true, depth: 10 }), function (error) {
                if (error) {
                    console.log(error);
                }
                console.log('file saved!');
                process.exit(0);
            });
        }
    }
});
var url = "http://www.bloomberg.com/research/stocks/private/person.asp?personId=673018&privcapId=345542";

request(url, function (error, response, body) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    parser.write(body);
    parser.end();
    // var dom  = htmlparser.parseDOM(body);
    // var b = util.inspect(dom,{showHidden: true,depth: 15})


});