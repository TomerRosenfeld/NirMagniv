/**
 * Created by Nir on 8/7/2015.
 */
var amazon = require('amazon-product-api');

client.itemSearch({
    keywords: 'Pulp fiction',
    searchIndex: 'DVD',
    responseGroup: 'ItemAttributes,Offers,Images'
}).then(function(results){
    console.log(results);
}).catch(function(err){
    console.log(err);
});