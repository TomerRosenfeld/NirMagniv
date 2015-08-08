/**
 * Created by Nir on 8/7/2015.
 */
var remove_over_18 = true; // Remove NSFW Posts
//reddit = require('redwrap');
var request = require('request');

// Get news from sources like reddit
module.exports = {
    /*getReddit: function(callback) { //worldnews

        reddit.r('2mlg4u', function(err, data, res){
            //console.log(data);
            //console.log(getRedditStuff(data.data.children));
            callback(getRedditStuff(data.data.children));
        });
    },*/

    requestReddit: function(callback) { //worldnews
        var sub = 'worldnews';
        //var sub = '2mlg4u';

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
    //console.log(data[0]);

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