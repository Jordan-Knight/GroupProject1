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

var slackApi = {
	oauth : "https://slack.com/oauth/authorize",
	clientId : "159539740338.187078916050",
	clientSecret : "ebe5869fe6e04851d665a42e8c637c7f",
	webHookUrl : "https://hooks.slack.com/services/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",
	curl : curl -X POST -H 'Content-type: application/json' --data '{"text":' slackApi.message'}',
	message : "",
	

};