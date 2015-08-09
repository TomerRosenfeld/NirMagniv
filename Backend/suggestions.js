/**
 * Created by Nir on 8/7/2015.
 */
module.exports = {
    get: function(temp, condition) {
        var suggestion = "It's a beautiful day! Go outside :) <br/><br/><a href=\"http://www.amazon.com/DS1006-1980s-Wayfarer-Fashion-Sunglasses/dp/B0018GJR4A/ref=sr_1_1?&ie=UTF8&qid=1438977561&sr=8-1&keywords=shades\">BUY SOME SHTUFFFFF</a>";
        var isRaining = condition.indexOf("Rain") != -1;

        if(isRaining)
            suggestion = "It's raining outside! <br/><br/><a href=\"http://www.amazon.com/Match-Blend-Buttoned-12778-Dark-Asian/dp/B00W0QUH4G/ref=sr_1_1?s=apparel&ie=UTF8&qid=1439107512&sr=1-1&keywords=Coat\">BUY A fancy COAT</a>";

        else if(condition == "Sunny")
            suggestion = "It's sunny outside! Take some swaggy shades. <br/><br/><a href=\"http://www.amazon.com/DS1006-1980s-Wayfarer-Fashion-Sunglasses/dp/B0018GJR4A/ref=sr_1_1?&ie=UTF8&qid=1438977561&sr=8-1&keywords=shades\">BUY SOME SHTUFFFFF</a>";
        else if(condition == "Partly Sunny")
            suggestion = "The weather is nice! Go breathe some fresh air with you swaggy shadeesss <br/><br/><a href=\"http://www.amazon.com/DS1006-1980s-Wayfarer-Fashion-Sunglasses/dp/B0018GJR4A/ref=sr_1_1?&ie=UTF8&qid=1438977561&sr=8-1&keywords=shades\">BUY SOME SHTUFFFFF</a>";
        else if(condition == "Cloudy")
            suggestion = "Well my secret sources say that the weather is CLoudy therefore let's go to mall today";



        return suggestion;

    }
};