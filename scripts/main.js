var pureCloudSession;
var usersApi;
var routingApi;
var outboundApi;

var _me = {};
var _queues = [];
var _campas = [];
var apiInstance;

  const platformClient = require('platformClient');

	const client = platformClient.ApiClient.instance;
	client.loginImplicitGrant("60feb42b-6ef0-4761-ad7f-95ac491ee688", "window.location.href")
	  .then((data) => {
	    console.log(data);
	    // Do authenticated things
	  })
	  .catch((err) => {
	    // Handle failure response
	    console.log(err);
	  });
