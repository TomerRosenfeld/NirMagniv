/**
 * Created by tomer on 07/08/15.
 */

var app = angular.module('one', []);
app.controller('oneCtrl', function ($scope,$location) {
        var query = document.location.search.replace("?", "");
        if (query == undefined || query == "" || query == null) {
            query = "New York";
            window.location = "?"+query;
        }
        var host = "188.226.168.96";
        var port = 666;
        $scope.weatherCounter = 0;
        $scope.loading = true;
        $scope.animated1 = false;
        $scope.animated2 = false;
        $scope.animated3 = false;
        $scope.animated4 = false;
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'sounds/opening_music.mp3');
        audioElement.setAttribute('autoplay', 'autoplay');
        $.get();
        audioElement.addEventListener("load", function () {
            audioElement.play();
        }, true);

        $('.play').click(function () {
            audioElement.play();
        });

        $('.pause').click(function () {
            audioElement.pause();
        });
        $.ajax({
            url: getAddr(host, port) + query,
            dataType: "jsonp",
            timeout: 20000,
            jsonpCallback: "callback",
            success: function (data) {
                audioElement.pause();
                $scope.data = data;
                $scope.weather = data.w[$scope.weatherCounter];
                $scope.shuffleColor($scope.weather.bg)
                $(".loading").fadeOut(1000, function () {
                    $scope.loading = false;
                    $scope.$digest();
                    $scope.articles = data.r;
                    $scope.changeWeatherVars();
                    $("#search_wrapper").addClass("animated fadeInDownBig");
                    $("#fab").addClass("animated rotateIn");
                    $(".arrows").addClass("animated fadeInLeftBig");
                    $("#card").addClass("animated fadeInUpBig");
                    setTimeout(function () {
                        $("#temp").addClass("animated fadeInRightBig");
                        $scope.animated1 = true;
                        $scope.$digest();
                        setTimeout(function () {
                            $("#condition").addClass("animated fadeInRightBig");
                            $scope.animated2 = true;
                            $scope.$digest();
                            setTimeout(function () {
                                $("#city").addClass("animated fadeInRightBig");
                                $scope.animated3 = true;
                                $scope.$digest();
                                setTimeout(function () {
                                    $("#day").addClass("animated fadeInRightBig");
                                    $scope.animated4 = true;
                                    $scope.$digest();
                                }, 70);
                            }, 50);
                        }, 50);
                    }, 400);
                });
            },

            error: function (jqXHR, textStatus, errorThrown) {
                audioElement.pause()
                alert("Couldn't connect to server; " + errorThrown)
            }
        });


        function getAddr(h, p) {
            return 'http://' + h + ':' + p + '/?';
        }

        $scope.darker = false;
        $scope.shuffleColor = function () {
            var color = $scope.weather.bg;
            if ($scope.darker) {
                $("wrapper").css("background-color", 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + 1.0 + ')');
            }
            else {
                $("body").css("background-color", 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + 0.8 + ')');
            }
            $scope.darker = !$scope.darker;
            setTimeout(function () {
                $scope.shuffleColor(color);
            }, 1000)
        };

        $scope.openDialog = function (title, url) {
            swal({
                    title: null
                    ,
                    text: "<iframe class='iframeSite' src='" + url + "'></iframe>",
                    confirmButtonText: "Open Article",
                    html: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        window.open(url)
                    }
                });
            $(".sweet-alert").attr("style", "display: block; margin-top: -417px; width: 70vw !important;margin-right: auto; margin-left: auto; left: 0;right: 0 ");
            $(".sweet-overlay").click(function () {
                swal.close();
                revertSweet()
            });
        };

        function alert(text) {
            swal({
                title: "Error!",
                text: text,
                type: "error",
                closeOnCancel: true,
                cancelButtonText: "Cool",
                confirmButtonText: "Cool"
            })
        }

        $("#weather_div").click(function () {
            swal({
                title: "Holy Shit!",
                text: $scope.suggestion,
                type: "success",
                closeOnCancel: true,
                html: true,
                cancelButtonText: "Cool"
            });
            revertSweet()


        });
        function revertSweet() {
            $(".sweet-alert").attr("style", "display: block;");
        }

        fartscroll(700);
        window.onload = function () {
            var elevator = new Elevator({
                mainAudio: 'sounds/four_seasons.wav',
                endAudio: 'sounds/ding.mp3'
            });
            $("#elevatorFuck").click(function () {
                elevator.elevate();
            })
        };
        $scope.updateWeather = function () {
            setTimeout(function () {
                $("#temp").addClass("animated fadeOutLeftBig");
                $scope.animated1 = true;
                $scope.$digest();
                setTimeout(function () {
                    $("#condition").addClass("animated fadeOutLeftBig");
                    $scope.animated2 = true;
                    $scope.$digest();
                    setTimeout(function () {
                        $("#city").addClass("animated fadeOutLeftBig");
                        $scope.animated3 = true;
                        setTimeout(function () {
                            $("#day").addClass("animated fadeOutLeftBig");
                            $scope.animated4 = true;

                            $scope.$digest();
                            $scope.day = $scope.weather.day;
                            $scope.temp = $scope.weather.temp;
                            $scope.condition = $scope.weather.condition;
                            $scope.city = $scope.weather.city;
                            $scope.suggestion = $scope.weather.suggestion;
                        }, 50)
                        setTimeout(function () {
                            $("#temp").removeClass("animated fadeOutLeftBig");
                            $("#temp").addClass("animated fadeInRightBig");
                            $scope.animated1 = true;
                            $scope.$digest();
                            setTimeout(function () {
                                $("#condition").removeClass("animated fadeOutLeftBig");
                                $("#condition").addClass("animated fadeInRightBig");
                                $scope.animated2 = true;
                                $scope.$digest();
                                setTimeout(function () {
                                    $("#city").removeClass("animated fadeOutLeftBig");
                                    $("#city").addClass("animated fadeInRightBig");
                                    $scope.animated3 = true;
                                    $scope.$digest();
                                    setTimeout(function () {
                                        $("#day").removeClass("animated fadeOutLeftBig");
                                        $("#day").addClass("animated fadeInRightBig");
                                        $scope.animated4 = true;
                                        $scope.$digest();
                                    }, 50);
                                }, 50);
                            }, 50);
                        }, 50);
                    }, 50);
                }, 50);
            }, 50);
        };
        $scope.changeWeatherVars = function () {
            $scope.day = $scope.weather.day;
            $scope.temp = $scope.weather.temp;
            $scope.condition = $scope.weather.condition;
            $scope.city = $scope.weather.city;
            $scope.suggestion = $scope.weather.suggestion;
            $scope.$digest()
        };
        $(document).keydown(function (e) {
                switch (e.which) {
                    case 37: // left
                        if ($scope.weatherCounter != 0) {
                            $scope.weatherCounter--;
                            $scope.weather = $scope.data.w[$scope.weatherCounter];
                            $scope.updateWeather();
                        }
                        break;
                    case 39: // right
                        if (!($scope.weatherCounter >= $scope.data.w.length - 1)) {
                            $scope.weatherCounter++;
                            $scope.weather = $scope.data.w[$scope.weatherCounter];
                            $scope.updateWeather();
                        }
                        break;
                    case 13:
                        window.location = "?"+$scope.search;

                        break;

                    default:
                        return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            }
        );
    }
)
;


