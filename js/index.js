$(document).ready(function() {
  //changed api for gathering location
  var APIIP = "https://ipinfo.io/json";
  //create new date
  var hour = new Date().getHours();
  //proxy server to get weather data - they dont offer https for free and Im not paying
  var proxy = "https://cors-anywhere.herokuapp.com/";

  
  //no need for this pop-up i fixed https issue for now
  //will keep code for reference
 /* var newWindowObj = window.open(
    "",
    "newWindow",
    "width=500,height=150,top=100,left=100,toolbar=1,location=true,scrollbars=false,menubar=true,resizable=false,personalbar=true"
  );
  newWindowObj.document.write(
    "<p style='background-color:red; border: 1px solid black;'>hello, if the weather isn't showing up....try deleting the -s- in https in the address bar.  If that doesn't work open me up in debugged and that should do the trick. sorry for the inconvience.</p>"
  );   */

  $.getJSON(
    APIIP,
    //requesting location data
    function(data) {
      //could do long and lat but would have to slice a string
      //using city is a bit less specific but okay
      var city = data.city;
      var country = data.country;
      
      //mandatory key for openweather api
      var KEY = "&APPID=cdefd410530b3d8d178163965643440b";
      //concat url with parameters and key code
      var URL =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "," +
        country +
        KEY;
      //requesting weather data
      $.getJSON(proxy + URL, function(data) {
        //isolate data and save to variables
        var type = data.weather[0].main;
        var id = data.weather[0].id;
        var city = data.name;
        //conversion formula
        var tempCel = Math.round(data.main.temp - 273.15);
        var tempC = tempCel + "°";
        var weather = data.weather[0].description;
        var tempF = Math.round(tempCel * (9 / 5) + 32) + "°";
        //helps me see if i need to add more backgrounds more new ids 
        console.log(tempF);
        console.log(id);

        //setting data on page
        $(".span1").text(tempF);
        $(".span2").text(city);

        //want to have one bg for night time
        /*
      if(hour > 5 || hour < 18){
        $('#display').css("background-image", "url ('https://i.kinja-img.com/gawker-media/image/upload/s--EUYvNPnM--/c_scale,f_auto,fl_progressive,q_80,w_800/ke9svxml3ctkvgix59xl.jpg')");
      }
      */

        //if black for different types of weather id

        //clear sky bg
        if (id === 800 || id === 801) {
          $("#display").css({
            "background-image": "url('http://ak5.picdn.net/shutterstock/videos/1747219/thumb/1.jpg')",
            "background-position": "-80px 10"
          });
        } else if (id <= 232 && id >= 200) {
          //thunderstorm
          $("#display").css({
            "background-color": "black",
            "background-image": "url('http://www.clker.com/cliparts/o/9/6/H/6/x/storm-cloud.svg')"
          });
        } else if (id < 532 && id >= 500) {
          //rain bg
          $("#display").css({
            "background-image": "url('http://www.hartstoneinn.com/wp-content/uploads/2013/06/rainy_day.jpg')",
            "background-position": "-200px 0"
          });
        } else if (id <= 622 && id >= 600) {
          //snow bg
          $("#display").css(
            "background-image",
            "url('http://uiconstock.com/wp-content/uploads/2014/03/Winter_Background.jpg')"
          );
        } else if (id <= 804 && id >= 802) {
          //cloudy no rain bg
          $("#display").css({
            "background-color": "lightblue",
            "background-image": "url('http://www.clipartbest.com/cliparts/ncE/BBb/ncEBBbMRi.png')",
            "background-position": "-120px -190px"
          });
        } else if (id < 782 && id > 700) {
          //foggy or hazy bg
          $("#display").css({
            "background-image": "url('http://clipground.com/images/fog-day-clipart-9.jpg')",
            "background-size": "cover"
          });
        } else {
          //default chicken cartoon bg

          $("#display").css({
            "background-image": "url('http://www.wpclipart.com/cartoon/animals/bird/bird_cartoons_2/confused_chickens.png')",
            "background-position": "140px 50px"
          });
        }

        //celcius farenheit toggle
        $(".node2").on("click", function() {
          $("#cel, #far").toggleClass("invisible");
          if ($(".span1").text() === tempF) {
            $(".span1").text(tempC);
          } else {
            $(".span1").html(tempF);
          }
        });
      });
    }
  );
});