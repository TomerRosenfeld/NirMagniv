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

            callback(getForcasts(result[0].forecast, result[0].current, result[0].location.name));
        });
    }
};

//module.exports.getTemp('Tel Aviv', function(d){});


function getForcasts(f, c, l) {
    var weathers = [];

    weathers.push(getJ(c, l, true));

    for(var i = 2; i < f.length; i++) {
        console.log(f[i]);
        weathers.push(getJ(f[i], l));
    }

    return weathers;
}

function getJ(data, loc, t) {
    //console.log(data);

    var DATA = {
        temp: parseInt(data.temperature || ((parseInt(data.low) + parseInt(data.high))/2)),
        condition: data.skytext || data.skytextday,
        city: loc,
        feelslike: parseInt(data.feelslike) || null,
        day: (t ? 'Today' : data.day)
    };

    DATA.bg = generateBackground(DATA.temp);

    DATA.suggestion = suggestions.get(DATA.temp, DATA.condition);

    return DATA;
}

function generateBackground(temp) {
    var color = 'ef6c00';

    // the temp under 17 its blue
    if(temp <= 25) {
        var diff = 25 - temp + 3;
        if(diff >= pallets.blue.length) {
            diff = pallets.blue.length-1;
        }

        color = pallets.blue[diff];
    }
    else {
        var diff = temp - 25 + 2;
        if(diff >= pallets.oranges.length) {
            diff = pallets.oranges.length-1;
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
//, 'F44336', 'E53935', reds
    //, 'FFFF00', 'FFEA00', 'FFD600' yellows
    // Low to high
    // When very hot it goes to red
    oranges: ['ffe0b2', 'ffcc80', 'ffb74d', 'ffa726', 'ff9800', 'fb8c00', 'f57c00', 'ef6c00', 'e65100',
    ],

    // Low to high
    blue: ['bbdefb', '90caf9', '64b5f6', '42a5f5', '2196f3', '1e88e5', '1976d2', '1565c0', '0d47a1'
        , '0A3981', '082E67', '062552']
        //, '283593', '1A237E']
};