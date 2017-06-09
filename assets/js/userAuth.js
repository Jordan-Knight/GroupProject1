
//initializes database in the app.js file

//enabled the use of email/password sign in in the firebase console

//______________________________________________________________________________________________________
//______________________________________________________________________________________________________

//_____________________________________________________________________________________________________
///////////////////////////////////////////////////////////////////////////////////////////////////////
//_____________________________________________________________________________________________________
$(document).ready(function() {
var name;
var userId;
var email; 
var password;
var confirmPassword;
var signedIn;

$("#createAccount").on("click", function(event){
      $('#userInfo').prepend('<div class="form-group" style="margin: 10px;">'+
                             '<label for="userName">User Name</label>'+
                             '<input style="border:none;" type="email" class="form-control"'+
                             ' id="userName" placeholder="userName">');
      $('#userInfo').append('<div class="form-group" style="margin: 10px;">'+
                            '<label for="confirmPassword">Confirm Password</label>'+
                            '<input type="password" style="border:none;" class="form-control"'+ 
                            'id="confirmPassword" placeholder="Reenter your password"></div>');
      $('#password').prepend('<div id="password-alert"></div>');
      $('#buttons').empty();
      $('#buttons').html('<button style="margin: 30px; border:none"; type="submit" '+
                         'class="btn btn-default" id="createAccountSubmit">Create Account</button>');
});


$(document).on('keyup', "input#confirmPassword",function () { 
  var pw = $("#userPassword");
  var cpw = $("#confirmPassword");
  if(pw.val()!=="" && pw.val() === cpw.val()){ 
    pw.css("background-color", "#b9ffaf");
    cpw.css("background-color", "#b9ffaf");
  }
  else{
    pw.css("background-color", "#ffc7b2");
    cpw.css("background-color", "#ffc7b2");
  }
   
});


$(document).on("click","#createAccountSubmit", function(event){
  event.preventDefault();
  $("#alerts").empty();
  $("#password-alert").empty();
  name            = $("#userName").val();
  email           = $("#userEmail").val();
  password        = $("#userPassword").val();
  confirmPassword = $("#confirmPassword").val();
  console.log(email);


  if(password == confirmPassword){
    //create user
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      $("#userName").val("");
      $("#userEmail").val("");
      $("#userPassword").val("");
      $("#confirmPassword").val("");
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode    = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      $('#alerts').prepend('<div class="alert alert-danger" role="alert">'+errorMessage+'</div>');
      // ...
    });
    email.html
  }
  else{
      $('#password-alert').prepend('<div class="alert alert-danger" role="alert">Your passwords do not match!</div>');
  }

});

$("#signIn").on("click", function(event){
  event.preventDefault();
  console.log("sign in");
  email    = $("#userEmail").val();
  password = $("#userPassword").val();

  $("#userEmail").val("");
  $("#userPassword").val("");
  console.log(email);

    //sign in existing user
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      var pathSplit = window.location.pathname.split('/')
      if (pathSplit[pathSplit.length-1] !== 'stumpPage.html'){
        window.location = "stumpPage.html"
      }

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode    = error.code;
      var errorMessage = error.message;
      // ...
    });

});

$(document).on("click", "#signOut", function(){
  var signedOut = false;
  firebase.auth().signOut().then(function(){
  }).catch(function(error) {
    // An error happened.
    signedOut=false;
    console.log("error signing out!");
  });
});

$(document).on("click", "#signInPage", function(){
  window.location = "index.html";
});

//user state is changed
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    if(name !== undefined){
      user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log(user.displayName);
          var pathSplit = window.location.pathname.split('/')
          if (pathSplit[pathSplit.length-1] !== 'stumpPage.html'){
                window.location = "stumpPage.html"
          }
        }, function(error) {
          console.log("error updating displayName");
        });
    }
    else{  var pathSplit = window.location.pathname.split('/')
          if (pathSplit[pathSplit.length-1] !== 'stumpPage.html'){
          window.location = "stumpPage.html"
          }}

    // window.location = "stumpPage.html"
    console.log(window.location)
    $("#navContents").html('<p class="navbar-text">Signed in as '+user.email+'</p>'+
      '<button type="button" id="signOut" class="btn btn-default navbar-btn navbar-right">Sign Out</button>');
  } else {
    // User is signed out.
    // ...
    var pathSplit = window.location.pathname.split('/')
    if (pathSplit[pathSplit.length-1] !== 'index.html'){
          window.location = "index.html"
    }
     $("#navContents").html('<button type="button" id="signInPage" class="btn btn-default navbar-btn navbar-right">Sign In</button>');
  }
  //email.html
});

  
})