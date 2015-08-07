/**
 * Created by tomer on 07/08/15.
 */


$(function() {

    var query = "Tel Aviv";
    var host = "192.168.1.143";



    $.ajax({
        url: getAddr(host, 666) + query,
        dataType: "jsonp",


        success: function (data) { // Data has been recieved
            calllback(data)
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Request Error frown emoticon ' + textStatus + " " + errorThrown + "\nServer is probably down");
        }
    });

});

function calllback(data) {
    console.log(data)
}

//Construct address from host and port (util function)
function getAddr(h, p) {
    return 'http://' + h + ':' + p + '/?';
}