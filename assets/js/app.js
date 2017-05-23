var googleApi = {

	key : "AIzaSyBUln0pM_BnfEb_h86rcctPuC5hECblXgY",
	queryUrl : "https://maps.googleapis.com/maps/api/js?key=" + googleApi.key + "&callback=initMap"

};

var firebaseConfig = {
	apiKey: "AIzaSyBsIeE686XAmx6rsPiE3igmwLIkGm1Iah8",
    authDomain: "studentmeetup-1495578444077.firebaseapp.com",
    databaseURL: "https://studentmeetup-1495578444077.firebaseio.com",
    projectId: "studentmeetup-1495578444077",
    storageBucket: "studentmeetup-1495578444077.appspot.com",
    messagingSenderId: "882686649590"

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