/**
 * Created by Nir on 8/7/2015.
 */
var weather = require('weather-js');
var utils = require('./utils');
var suggestions = require('./suggestions');

//Far or Celcius
var units = 'C';



module.exports = {
    getTemp: function(loc, callback) {
        weather.find({search: loc, degreeType: units}, function(err, result) {
            if(err){
                console.log(err);
                return;
            }
            //console.log(JSON.stringify(result, null, 2));
            //console.log(result[0].current.temperature);
            var temp = result[0].current.temperature;
            //console.log(result[0]);
            //console.log(result);


            //getForcasts(result[0].forecast, result[0].current, result[0].location.name);


            callback(getForcasts(result[0].forecast, result[0].current, result[0].location.name));
        });
    }
};

//module.exports.getTemp('Tel Aviv', function(d){});


function getForcasts(f, c, l) {
    var weathers = [];

    weathers.push(getJ(c, l));
    //weathers.push(getJ(f[0], l));

    //console.log(f[0]);

    for(var i = 2; i < f.length; i++) {
        //console.log(f)
        console.log(f[i]);
        weathers.push(getJ(f[i], l));
    }

    return weathers;
}

function getJ(data, loc, f) {
    //console.log(data);

    var DATA = {
        temp: parseInt(data.temperature || ((parseInt(data.low) + parseInt(data.high))/2)),
        condition: data.skytext || data.skytextday,
        city: loc,
        feelslike: parseInt(data.feelslike) || null,
        day: data.day || 'Today'
    };


    DATA.bg = generateBackground(DATA.temp);
    //console.log(DATA.bg);
    //console.log(DATA);
    DATA.suggestion = suggestions.get(DATA.temp, DATA.condition);
    //DATA.suggestion = 'asdasdasd';

    //console.log(DATA.bg.r);
    return DATA;
}

function generateBackground(temp) {
    var color = 'ef6c00';
    // the temp under 17 its blue
    if(temp <= 25) {

        var diff = 25 - temp + 3;
        if(diff >= 9) {
            diff = 8;
        }

        color = pallets.blue[diff];
    }
    else {
        var diff = temp - 25;
        if(diff >= 9) {
            diff = 8;
        }

        color = pallets.oranges[diff];

    }


    if(utils.isNight()) {
        //color = utils.shadeColor("#" + color, 10).replace("#", "");
    }

    var rgbColor = utils.htr("#" + color);
    console.log(rgbColor);

    return rgbColor;
}

var pallets = {
    
    oranges: ['ffe0b2', 'ffcc80', 'ffb74d', 'ffa726', 'ff9800', 'fb8c00', 'f57c00', 'ef6c00', 'e65100'],

    // Low to high
    blue: ['bbdefb', '90caf9', '64b5f6', '42a5f5', '2196f3', '1e88e5', '1976d2', '1565c0', '0d47a1']
};

function inRange(input, range) {
    return parseInt(input * 1/range);
}