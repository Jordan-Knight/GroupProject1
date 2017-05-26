

var googleApi = {

	key : "AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
	queryUrl : "https://maps.googleapis.com/maps/api/js?key=" + this.key + "&callback=initMap"

};

var config = {
   apiKey: "AIzaSyD-ftcKUoOvdhzaeaXypzqjyzKrsoZMGr8",
   authDomain: "stump-ddd23.firebaseapp.com",
   databaseURL: "https://stump-ddd23.firebaseio.com",
   projectId: "stump-ddd23",
   storageBucket: "stump-ddd23.appspot.com",
   messagingSenderId: "140581118335"
 };

firebase.initializeApp(config);

var database = firebase.database();






var userID;
var userName;
var userCurrentLocation;
var userAvailabilty;
var userEmail;

//array of users
/*var users = [{
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


var stumpObject = {
	creator: "", 
	availability: "", 
	location: "30.283552,-97.733410", 
	stumpees: "", 
	date: ""
};



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




//*******************************************************************************************************************
// Jordan Firebase push plus population of table
$("#add-stump-btn").on("click", function(event){
		event.preventDefault();
//Create jQuery events to push a selected-user and selected-avail class to the element.
		//stumpObject.creator = $(".selected-user").data("value");
		stumpObject.availability = $(".selected-avail").data("value");
		stumpObject.location = $("Placholder");

		database.ref().push({
			creator: stumpObject.creator, 
			availability: stumpObject.availability, 
			location: stumpObject.location, 
			stumpees: "", 
			date: firebase.database.ServerValue.TIMESTAMP
		});



});

$(document).ready(function() {

	database.ref().on("child_added", function(snapshot){
		snapshot.forEach(function(){

			snapshot.forEach(function(){
				var row = $("<tr>");

				row.append("<td>" + stumpObject.creator + "</td> <td>" + stumpObject.location + "</td> <td>" + stumpObject.stumpees + "</td> <td>" + stumpObject.availability + "<td>");
				$("#stumps").append(row);

			});
 

		});
		
	});

});







//*******************************************************************************************************************
//  Tony GeoLocation Area
// $.ajax({
// 			url: "https://www.google.com/maps/embed/v1/geolocate?key=AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
// 			method: "GET"
// 		}).done(function(reply){
// 			var location=reply.data;
// 			console.log(location);
// 		});


    
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 30.2672, lng: -97.7431},
          zoom: 14
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
            infoWindow.setContent('<img src="assets/images/small-black-silhouette-bird.png" style="width:1.5em; height:1.5em;">'+'fly to the next stump!');
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

   

   //************************************************************************************
   //    Event Handlers - Marya
   //   Name, View and Join buttons
   //

 $(document).ready(function() {
    console.log("Event Handlers Reached -- Start js Stump")

    var stumpID = 0;
  
 // -----  Static button event handlers  ------  //
 
 //  User Name buttons  //
 	$(".btn-user").on("click", function(){
        stumpObject.creator = $(this).attr("data-value");
        console.log("Stump User selected is: " + stumpObject.creator);
    });


 //  User Availability buttons  //
 	$(".avail-btn").on("click", function(){
        stumpObject.availability = $(this).attr("data-value");
        console.log("Stump user availability is: " + stumpObject.availability);
    });



 // ----- Dynamic button event handlers   ------//
 
 //  View stump location button  //
 	$(document).on("click", ".view-btn", function(){
        //stumpID = $(this).attr("data-stumpID");
         console.log("View Stump ID is: " + stumpID);
    });   


 //  Join stump meetup location  //
 	$(document).on("click", ".join-btn", function(){
        //stumpID = $(this).attr("data-stumpID");
         console.log("Join Stump ID is: " + stumpID);
    });   


});

