var googleApi = {

	key : "AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
	queryUrl : "https://maps.googleapis.com/maps/api/js?key=" + googleApi.key + "&callback=initMap"

};

var firebaseConfig = {
    apiKey: "AIzaSyD-ftcKUoOvdhzaeaXypzqjyzKrsoZMGr8",
    authDomain: "stump-ddd23.firebaseapp.com",
    databaseURL: "https://stump-ddd23.firebaseio.com",
    projectId: "stump-ddd23",
    storageBucket: "stump-ddd23.appspot.com",
    messagingSenderId: "140581118335"

};

firebase.initializeApp(config);

// var slackApi = {
// 	oauth : "https://slack.com/oauth/authorize",
// 	clientId : "159539740338.187078916050",
// 	clientSecret : "ebe5869fe6e04851d665a42e8c637c7f",
// 	webHookUrl : "https://hooks.slack.com/services/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",
// 	curl : curl -X POST -H 'Content-type: application/json' --data '{"text":' slackApi.message'}',
// 	message : "",
	

// };


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

var stumpObject = {creater: "", availability: "", location: "", stumpees: "", date: ""};

var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }