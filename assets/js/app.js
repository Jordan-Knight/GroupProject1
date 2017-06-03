var googleApi = {

    key: "AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
    queryUrl: "https://maps.googleapis.com/maps/api/js?key=" + this.key + "&callback=initMap"

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
var filterStatus = false;
var today = moment().format("MM/DD/YYYY")


var users = [{
        ID: "student1",
        name: "kaylea",
        email: "kayleabox09@gmail.com"
    },
    {
        ID: "student2",
        name: "marya",
        email: "marya.crigler@att.net"
    },
    {
        ID: "student3",
        name: "jordan",
        email: "jbknight83@gmail.com"
    },
    {
        ID: "student4",
        name: "anthony",
        email: "apekearo@gmail.com"
    },
    {
        ID: "student5",
        name: "john",
        email: "jfbendfeldt@gmail.com"
    }
];


var stumpObject = {
    creator: "",
    availability: "",
    location: {},
    stumpees: "",
    date: moment().format("MM/DD/YYYY"),
    locationName:"",
    address:"",
    placeId:"",
    stumpID : 1
};

//*******************************************************************************************************************
// Jordan Firebase push plus population of table




//*******************************************************************************************************************
//  Tony GeoLocation Area

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
//this is where we will store the user geolocaion to base the nearby search on
var userPosition = {
    //saved temp lat and lng values in case user does not allow geolocation
    lat: 30.2672,
    lng: -97.7431
};


//this function initiates the map to be displayed on the screen based on 
//user geoloction
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 30.2672,
            lng: -97.7431
        },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(userPosition);
            infoWindow.setContent('<img src="assets/images/flying-bird.png" style="width:1.5em; height:1.5em;">' + 'Fly to the next stump!');
            infoWindow.open(map);
            map.setCenter(userPosition);


        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(userPosition);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



//************************************************************************************
//    Build html table on data change
//

$(document).ready(function() {
    database.ref().orderByChild("date").startAt(today).on("child_added", function(snapshot) {
        console.log(snapshot);
        console.log("Key" + snapshot.V.path.o[0]);//this is the id for the element stored in the database
        var row = $('<tr data-value="'+snapshot.V.path.o[0]+'">');
        console.log(row.attr("data-value")+" data-value on the tr");
        var checkbox = "<input type = 'checkbox' class = 'checkbox' id ='" + parseInt(snapshot.val().stumpID) + "'>";

        row.append('<td data-value="'+snapshot.V.path.o[0]+'">' + snapshot.val().creator +
         '</td> <td><div class="stumpMap" id="'+snapshot.V.path.o[0]+'">'+snapshot.val().locationName+'</div></td> <td>' + snapshot.val().stumpees + '</td> <td>' + 
          snapshot.val().date + '</td> <td>' + snapshot.val().availability + 
         '</td> <td>' + checkbox + '</td> <td></tr>');
        
        $("#stumps").append(row);

           		$.each(snapshot, function(){

           			var snapSid = parseInt(snapshot.val().stumpID) ;
           			
           			if (snapSid > stumpObject.stumpID){ stumpObject.stumpID = snapSid};
           		});
           		
           		stumpObject.stumpID = stumpObject.stumpID + 1;

     });


    console.log("Event Handlers Reached -- Start js Stump")


    //************************************************************************************
    //    Event Handlers - Marya
    //
    // -----  Static button event handlers Name, Availability, Date Picker ------  //
   

    //  User Name buttons  //
    $(".btn-user").on("click", function() {
        stumpObject.creator = $(this).attr("data-value");
        console.log("Stump User selected is: " + stumpObject.creator);

        //**************************************************************************************
        //I am inside the ".btn-user" function adding remove buttons when the users is selected
        //appends a button to remove the stump *****still need to only append it for the creator
        //kaylea
        addRemoveBtn(stumpObject.creator);

        //as of now the user has to select their name again after 
        //submitting the create stump form in order to see the ".remove-btn"
        //**************************************************************************************

    });


    //  User Availability buttons  //
    $(".avail-btn").on("click", function() {
        stumpObject.availability = $(this).attr("data-value");
        console.log("Stump user availability is: " + stumpObject.availability);
    });

    // Date Picker input //
    console.log("Default date is: " + stumpObject.date) 
    $(function() {
    $('input[name="stumpDate"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true
    }, 
    function(start) {
        stumpObject.date = moment(start).format("MM/DD/YYYY");
        console.log("Date picked is " + stumpObject.date)
    });
    });


    //  Filter button  //
    $('.glyphicon').parent().click(function(){
        if(jQuery(this).children('.glyphicon').hasClass('glyphicon-off')){
            jQuery(this).children('.glyphicon').removeClass('glyphicon-off').addClass('glyphicon-sort-by-attributes');
            filterStatus = true;
            console.log ("filter was off, turned it on. Current status is: " + filterStatus);
            $("#stumps").empty();
            database.ref().orderByChild("date").equalTo(stumpObject.date).on("child_added", function(snapshot) {
                    console.log("the filtered date is: " + stumpObject.date + "the creator is: " + snapshot.val().creator)
                    var row = $("<tr>");
                    var checkbox = "<input type = 'checkbox' class = 'checkbox' id ='" + parseInt(snapshot.val().stumpID) + "'>";
                    $('checkbox').on('click', function() {
                        $(this).addClass('checked');
                    });
                    row.append("<td data-value='"+snapshot.V.path.o[0]+"'>" + snapshot.val().creator + "</td> <td>" + snapshot.val().locationName + "</td> <td>" + snapshot.val().stumpees + "</td> <td>" + snapshot.val().date + "</td> <td>" + snapshot.val().availability + "</td> <td>" + checkbox + "</td> <td></tr>");
                    $("#stumps").append(row);

                            $.each(snapshot, function(){

                                var snapSid = parseInt(snapshot.val().stumpID) ;
                                
                                if (snapSid > stumpObject.stumpID){ stumpObject.stumpID = snapSid};
                            });
                            
                            stumpObject.stumpID = stumpObject.stumpID + 1;

                });

            }
        else if(jQuery(this).children('.glyphicon').hasClass('glyphicon-sort-by-attributes')){
            jQuery(this).children('.glyphicon').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-off');
             filterStatus = false;
             console.log ("filter was on, turned it off. Current status is: " + filterStatus);
              $("#stumps").empty();
             database.ref().orderByChild("date").startAt(today).on("child_added", function(snapshot) {
                    console.log(snapshot.V.path.o[0]);//this is the id for the element stored in the database
                    var row = $("<tr>");
                    var checkbox = "<input type = 'checkbox' class = 'checkbox' id ='" + parseInt(snapshot.val().stumpID) + "'>";
                    $('checkbox').on('click', function() {
                        $(this).addClass('checked');
                    });
                    row.append("<td data-value='"+snapshot.V.path.o[0]+"'>" + snapshot.val().creator + "</td> <td>" + snapshot.val().locationName + "</td> <td>" + snapshot.val().stumpees + "</td> <td>" + snapshot.val().date + "</td> <td>" + snapshot.val().availability + "</td> <td>" + checkbox + "</td> <td></tr>");
                    $("#stumps").append(row);
                            $.each(snapshot, function(){

                                var snapSid = parseInt(snapshot.val().stumpID) ;
                                
                                if (snapSid > stumpObject.stumpID){ stumpObject.stumpID = snapSid};
                            });   
                            stumpObject.stumpID = stumpObject.stumpID + 1;

            });
        }
    });

    //*********************************************************************************
    //KAYLEA
    //--------------------NEARBY PLACES SEARCH
    var chosenPlace;
    $('#places').on("click", function() {

        getPlaces();

        //gets places nearby the user that they can meet at and stores the location
        function getPlaces() {
            console.log(userPosition);

            map = new google.maps.Map(document.getElementById('map'), {
                center: userPosition,
                zoom: 12
            });

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: userPosition,
                radius: 2500,
                type: ['cafe']
            }, callback);
        }

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    //log the results to make sure it is getting objects back from google
                    console.log(results[i]);
                    //this gets us the lat and lng of the place
                    console.log("lng= " +results[i].geometry.viewport.b.b + "lat= " + results[i].geometry.viewport.f.b);
                    var placeLocation = results[i].geometry.viewport.f.b+","+results[i].geometry.viewport.b.b;
                    console.log(placeLocation);
                    createMarker(results[i], "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff6363");
                }
            }
        }

        function createMarker(place, icon) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                //ima change some colors!!!!!
                //https://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker
                //https://developers.google.com/maps/documentation/javascript/symbols
                icon: icon
            });

            //did some mousin' over stuff... now you can see the place name when you hover!
            google.maps.event.addListener(marker, "mouseover", function(event) {
                infoWindow.setContent(place.name);
                infoWindow.open(map, this);
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
                //this gets the lat and lng of the clicked on place and saves it to chosenPlace
                stumpObject.locationName = place.name;
                stumpObject.location = {
                  lat:place.geometry.viewport.f.b,
                  lng:place.geometry.viewport.b.b
                }
                stumpObject.placeId = place.place_id;
                stumpObject.address = place.vicinity;
                console.log("this is the chosen place! "+stumpObject.locationName +stumpObject.location + stumpObject.address + stumpObject.placeId);
              
                map = new google.maps.Map(document.getElementById('map'), {
                center: stumpObject.location,
                zoom: 12
                });
                createMarker(place, "assets/images/tree-stump-.png");
                //createMarker(userPosition, "88bafc");
            });
        }

    });
    //************************************************************************************

 // ----- Dynamic button event handlers   ------//
 
 //  View stump location button  //
 	$(document).on("click", ".view-btn", function(){
        //stumpID = $(this).attr("data-stumpID");
          //try to insert code that will call back the location object from firebase

         console.log("View Stump ID is: " + stumpID);
    });   



    //  Join stump meetup location  //
    $(document).on("click", ".join-btn", function() {
        //stumpID = $(this).attr("data-stumpID");
        var stumps = [];
        database.ref().on("child_added", function(snapshot){
        	snapshot.forEach(function(){

        	});

        });
        
    });

    $(document).on("click", ".checkbox", function() {
            $(this).addClass('checked');
     });



    $("#add-stump-btn").on("click", function(event) {
    event.preventDefault();
    //Create jQuery events to push a selected-user and selected-avail class to the element.


    database.ref().push({
        creator: stumpObject.creator,
        availability: stumpObject.availability,
        location: stumpObject.location,
        stumpees: "",
        date: stumpObject.date,
        placeId: stumpObject.placeId,
        locationName : stumpObject.locationName,
        stumpID : stumpObject.stumpID
    });

    addRemoveBtn(stumpObject.creator);

});

    function addRemoveBtn(currentUser){
        var numRows = $('#stumps tr').length;
        for(i=0; i<numRows; i++){
            //removes all the removal buttons when a new user is selected
            $("#stumps tr:eq('"+i+"') td:eq('6')").html("")
            //loops through the table data to see if the selected user has a stump in there name    
            if($("#stumps tr:eq('"+i+"') td:eq('0')").text() === currentUser || $("#stumps tr:eq('"+i+"') td:eq('0')").text() == ""){
                //gets the access key that was stored when the stump was created and saves it in itemId
                var itemId = $("#stumps tr:eq('"+i+"') td:eq('0')").attr("data-value");
                console.log(itemId); //checks data-value being saved to button
                //adds the object key as a data-value to the remove-btn so the unique element can be located in the database
                $("#stumps tr:eq('"+i+"') td:eq('6')").html('<button type="button" data-value="'+itemId+'" class="btn btn-danger remove-btn">X</button>');
                //found a solution to appending information to a specific column here: https://api.jquery.com/last-selector/
            }
        }
    }

    $(document).on("click", ".remove-btn", function(){
        //gets the data-value of the remove-btn and stores it in removeThisNode
        var removeThisNode = $(this).attr("data-value");
        console.log(removeThisNode); //check the data-value
        //uses the data-value of the remove-btn to remove the stumpObject stored at that location in the database
        database.ref("/"+removeThisNode).remove();
        //removes the item from the html table
        $(this).closest('tr').remove();
        //https://stackoverflow.com/questions/23249130/delete-table-row-using-jquery
    });

        //--------------------------------------------------------------------------------------------
        //********************************************************************************************
        //--------------------------------------------------------------------------------------------
        //changes the map to show the stump selected and adds details under the map
        $(document).on("click", ".stumpMap", function(){
            var object = $(this).attr('id');
            database.ref(object).on('value', function(snap){
                var request = {
                  placeId: snap.val().placeId
                };

                console.log(request);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: snap.val().location,
                    zoom: 14
                });

                infowindow = new google.maps.InfoWindow();
                service = new google.maps.places.PlacesService(map);
                service.getDetails(request, callbackStump);

                function callbackStump(place, status) {
                    console.log(place);//this shows the place object returned, 
                    //will leave it in until we have finalized all of the information we want to pull from it
                    var placeInfo = $("#placeInfo");
                    placeInfo.css("visibility", "visible")
                    //this will need to be cleared when get places is selected after a stump is viewed already
                    placeInfo.html('<div id="placeName">Location: '+place.name+'</div>'+
                        '<div id="address">Address: <a href="'+place.url+'" id="googleMapUrl" target="_blank">'+place.formatted_address+'</a></div>'+
                        '<div id="stumpCreator">Creator: '+snap.val().creator+'</div>'+
                        '<div id="date">Date: '+snap.val().date+"<br>Time: "+snap.val().availability+'</div>'+
                        '<div id="website">Website: </div>');

                    if(place.website){
                        $("#website").append('<a href="'+place.website+'" target="_blank">'+place.website+'</a>');
                    }

                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location,
                        icon: "assets/images/tree-stump-.png"
                    });
                  }
                }
            })
            
        });
        //--------------------------------------------------------------------------------------------
        //********************************************************************************************
        //--------------------------------------------------------------------------------------------


});