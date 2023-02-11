var pureCloudSession;
var usersApi;
var routingApi;
var outboundApi;

var _me = {};
var _queues = [];
var _campas = [];
var apiInstance;

$(document).ready(function() {

	const client = platformClient.ApiClient.instance;
	client.loginImplicitGrant(clientId, redirectUri, { state: state })
	  .then((data) => {
	    console.log(data);
	    // Do authenticated things
	  })
	  .catch((err) => {
	    // Handle failure response
	    console.log(err);
	  });

};
