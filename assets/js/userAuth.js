//_______________________________________Database Config Stuff_________________________________________
//_____________________________________________________________________________________________________

var config   = {
    apiKey: "AIzaSyD-ftcKUoOvdhzaeaXypzqjyzKrsoZMGr8",
    authDomain: "stump-ddd23.firebaseapp.com",
    databaseURL: "https://stump-ddd23.firebaseio.com",
    projectId: "stump-ddd23",
    storageBucket: "stump-ddd23.appspot.com",
    messagingSenderId: "140581118335"
};

firebase.initializeApp(config);

var database = firebase.database();


//enabled the use of email/password sign in in the firebase console

//______________________________________________________________________________________________________
//______________________________________________________________________________________________________


var email; 
var password;
$("#createAccount").on("click", function(){

  email    = $("#userEmail").val();
  password = $("#userPassword").val();
  console.log(email+' '+password);
//create user
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode    = error.code;
    var errorMessage = error.message;
    // ...
  });
  email.html

})


//sign in existing user
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode    = error.code;
  var errorMessage = error.message;
  // ...
});

//user state is changed
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName   = user.displayName;
    var email         = user.email;
    var emailVerified = user.emailVerified;
    var photoURL      = user.photoURL;
    var isAnonymous   = user.isAnonymous;
    var uid           = user.uid;
    var providerData  = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
email.html
