var googleApi = {

	key : "AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
	queryUrl : "https://maps.googleapis.com/maps/api/js?key=" + this.key + "&callback=initMap"

};

var firebaseConfig = {
    apiKey: "AIzaSyD-ftcKUoOvdhzaeaXypzqjyzKrsoZMGr8",
    authDomain: "stump-ddd23.firebaseapp.com",
    databaseURL: "https://stump-ddd23.firebaseio.com",
    projectId: "stump-ddd23",
    storageBucket: "stump-ddd23.appspot.com",
    messagingSenderId: "140581118335"

};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();




/*var userID;
var userName;
var userCurrentLocation;
var userAvailabilty;
var userEmail;

//array of users
*var users = [{
	ID: userID,
	name: userName,
	currentLocation: userCurrentLocation,
	//stumpLocation: userStumpLocation //maybe????
	availability: userAvailabilty,
	email: userEmail
}];*/

var users = [
{ID: "student1", name: "kaylea", email: "kayleabox09@gmail.com"}, 
{ID: "student2", name: "marya", email: "marya.crigler@att.net"}, 
{ID: "student3", name: "jordan", email: "jbknight83@gmail.com"},
{ID: "student4", name: "anthony", email: "apekearo@gmail.com"}, 
{ID: "student5", name: "john", email: "jfbendfeldt@gmail.com"} ];

var stumpObject = {creater: "", availability: "", location: "30,-97", stumpees: "", date: ""};

//******************************************************************************************************************
//THIS IS KAYLEA'S API STUFFFFFF!

//the type of place the user wants to meet at
var placeType = "cafe";
//any restrictions on the place **vegetarian, gluten free???
var keyword = "vegan";
//distance from the user location **this will be a set distance for now but I am using a variable in case 
//we want to change it in the future
var distance = 1500;

//https://console.developers.google.com/apis/credentials?project=studentmeetup-168604
//this is a new key specifically for the google places library 
var placesAPI = "AIzaSyBNTLpbtTYUAjvokJlpdDVDTqxbHqFYDkg";

//could not get this method to work
/*var googlePlaceUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+stumpObject.location+"&radius="+distance+
"&type="+placeType+"&keyword="+keyword+"&key="+placesAPI;*/

	//use this format once we have figured out how to get the user location
	//********that might require putting the whole google places call in a function and calling it upon click or something
	//$("#apiStuff").append("<div id='map'></div>");
	//$("#apiStuff").append('<script type="text/javascript" src="https://maps.googleapis.com'+
	//'/maps/api/js?key=AIzaSyBNTLpbtTYUAjvokJlpdDVDTqxbHqFYDkg&libraries=places"></script>');
 
      var map;
      var infowindow;

      function initMap() {
        var currentLocation = {lat: 30.3467106, lng: -97.7381047};

        map = new google.maps.Map(document.getElementById('map'), {
          center: currentLocation,
          zoom: 12
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: currentLocation,
          radius: distance,
          type: ['cafe']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
          	//log the results to make sure it is getting objects back from google
          	console.log(results[i]);
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }



//this solution returns this error: json?location=30,-97&radius=16093.4&type=cafe&keyword=vegan&key=AIzaSyBNTLpbtTYUAjvokJlpdDVDTqxbHqF…:2 Uncaught SyntaxError: Unexpected token :
     /*$.ajax({
        type: 'GET',
        url:googlePlaceUrl,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (json) {
            console.log(json.sites);
        },
        error: function (e) {
            console.log(e.message);

        }
    });*/


	
//*********
	//this error is happening: jquery.min.js:4 XMLHttpRequest cannot load file:///C:/Users/kaylea/Documents/utcodebootcamp/GroupProject1/navHandler.a…e%3Dcafe%26keyword%3Dvegan%26key%3DAIzaSyBNTLpbtTYUAjvokJlpdDVDTqxbHqFYDkg. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.


	//this solution can be found here https://stackoverflow.com/questions/18100195/how-to-send-cross-domain-request-to-google-places-api-seems-it-doesnt-support	
     /*$.ajax({
          url: 'navHandler.ashx',
          type: 'GET',
          data: {
              'action': 'nearbySearch',
              'url':googlePlaceUrl
          },
          success: function (data) {
              console.log(JSON.parse(data));
          }
      });*/
 //**********

//*******************************************************************************************************************