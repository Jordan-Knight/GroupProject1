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

var stumpObject = {creater: "", availability: "", location: "30.283552,-97.733410", stumpees: "", date: ""};

//******************************************************************************************************************
//THIS IS KAYLEA'S API STUFFFFFF!

//the type of place the user wants to meet at
var placeType = "cafe";
//any restrictions on the place **vegetarian, gluten free???
var keyword = "coffee";
//distance from the user location **this will be a set distance for now but I am using a variable in case 
//we want to change it in the future
var distance = "16093.4";

var googlePlaceUrl = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location="+stumpObject.location+"&radius="+distance+
"&type="+type+"&keyword="+keyword+"&key="+googleApi.key;

$.ajax({
                url: googlePlaceUrl,
                method: "GET"
            }).done( function (reponse) {
   				var result = reponse.data;
   				console.log(result);
            });
console.log(googlePlaceUrl);
//*******************************************************************************************************************