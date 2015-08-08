/**
 * Created by Nir on 8/7/2015.
 */
var http = require('http');
var weather = require('./weather');
var news = require('./news');

http.createServer(function(req, res) {
    query = parseURL(req.url);

    weather.getTemp(query, function(weather) {

        //var output = "callback(" + data + ")";
        news.requestReddit(function(articles){
            console.log("GOT IT! " + weather);
            console.log(req.url);

            res.writeHead(200, {
                'Content-Type': 'application/javascript' //cuz we're sending back and array
            });

            var finalData = {
                r: articles,
                w: weather
            };

            var output = "callback(" + JSON.stringify(finalData) + ")";

            res.end(output);
        });

        //res.end(data);
    });
}).listen(666);

console.log("Server running");

function parseURL(url) { //Parse url and Get query /* UTIL */
    url = url.replace(/&callback=callback&_=[0-9]+/g, "");
    url = url.slice(2);
    return url;
}