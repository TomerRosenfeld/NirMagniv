/**
 * Created by Nir on 8/8/2015.
 */
// Call apply to start adding images to timeline
// http://en.wikipedia.org/w/api.php?action=query&titles=Microsoft&prop=pageimages&format=json&pithumbsize=500

//var words = require('./find_words');

var addr = "http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=1000&titles=";

applyIMAGES();


function applyIMAGES () {
    applyImages(0);
}

function applyImages(index) {

    console.log(index);

    if (index == events.length - 1)
        return;

    var query = chooseWords(events[index].meaning);

    //console.log(query);


    getImage(query, function (data) {

            //console.log(data);
            //$('#events article:nth-child(' + (index+4) + ')').css("background-image", "url("+data+")");
            console.log(data)
            //$("article[index=" + index + "]").css("background-image", "url(" + data + ")");




            //$("article[index=" + index + "]").attr('class', 'width'); // And change to class of the background width image

            //$("img[index=" + index + "]").attr("src", data);

            applyImages(index + 1);
        },
        function () {
            //console.error('err');
            //$("article[index=" + index + "]").attr('class')
            applyImages(index + 1);
        });

    //http://okfnlabs.org/wikipediajs/docs/wikipedia.html

}



//Function to get autocomplete suggestions from wikipedia
function getImage(query, callbackResults, error) {

    xhr = $.ajax({
        url: addr + query,
        dataType: "jsonp",
        cache: false,
        timeout: 1000,
        jsonpCallback: "callbackResults",

        success: function (data) { // Data has been recieved
            //console.log(data);
            try {
                //console.log(JSON.stringify(data).match("http:\/\/.+?(?=\")")[0]); // EXTRACT URL

                callbackResults(JSON.stringify(data).match("http:\/\/.+?(?=\")")[0]); //Return array of suggestions
            } catch (exp) {
                error();
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            // If there is an error
            console.error("Error with requesting suggestions for images, ERROR:" + errorThrown);
        }
    });
}

// There is an error and images stop loading


// BUG - when you search and then go immediatly back and search again images are buggy ( i guess because it hasn't finished loading images from before so it continues to dump images )


// This module finds the words relevant for images

function chooseWords () {

    // YUP IMPORTANT
    t = replaceMonths(t);

    // And search em
    var words = search(t);

    // Some replaces to avoid not finding images
    // e.g. apple stores -> store
    words = words.replace("Stores", "Store").replace(";","").replace("Nokias","Nokia").replace("Microsofts","Microsoft");

    words = finalAdjustments(words);


    console.log(words);

    return words;
};


// Replace month so they don't interrupt
function replaceMonths(t) { //util
    return t.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/g, "");
}

function finalAdjustments(t) {
    if (t[t.length - 1] == ',') {
        t = t.substring(0, t.length - 1)
    }

    return t;
}


// Search for suiting words
function search(t) {
    var words = "";
    t = t.split(" ");

    for (var i = 0; i < t.length; i++) {

        try {
            /*if (/[A-Z]/.test(t[i][0]) && /[A-Z]/.test(t[i + 1][0]) && /[A-Z]/.test(t[i + 2][0])) {
             words = t[i] + "_" + t[i + 1] + "_" + t[i + 2];
             break;
             }*/

            if (/[A-Z]/.test(t[i][0]) && /[A-Z]/.test(t[i + 1][0])) {
                words = t[i] + "_" + t[i + 1];
                break; // if found say Bill_Gates then get out of for
            }

            if (/[A-Z]/.test(t[i][0])) {
                words = t[i];

            }
        } catch (exp) {}

    }

    // e.g. Seattle-Redmond
    if(words.indexOf("-") != -1) {
        // Seattle
        words = words.split("-")[0];
    }

    return words;
}


//words = t.match(/[A-Z].+?(?= )/g)[0];
// [A-Z].+? [A-Z].+?(?= )

