/**
 * Created by Nir on 8/7/2015.
 */
var remove_over_18 = true; // Remove NSFW Posts

var request = require('request');

var sub = 'worldnews';

// Get news from sources like reddit
module.exports = {
    requestReddit: function(callback) { //worldnews

        request('http://www.reddit.com/r/'+sub+'.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Google homepage.

                var data = JSON.parse(body);
                callback(getRedditStuff(data.data.children));

            }
        })
    }
};


function getRedditStuff(data) {

    var articles = [];

    for(var i = 0; i < data.length; i++) {
        if(!data[i].data.over_18 && remove_over_18) {
            articles.push({
                title: data[i].data.title,
                url: data[i].data.url
            });
        }
    }

    return articles;
}