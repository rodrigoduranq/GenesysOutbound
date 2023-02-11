var pureCloudSession;
var usersApi;
var routingApi;
var outboundApi;

var _me = {};
var _queues = [];
var _campas = [];
var apiInstance;


/*
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

*/

pureCloudSession = purecloud.platform.PureCloudSession({
	environment: 'mypurecloud.com',
	strategy: 'implicit',
	clientId: '60feb42b-6ef0-4761-ad7f-95ac491ee688',
	redirectUrl: window.location.href,
	storageKey: 'queue-notifications-example-auth-token',
	timeout: 10000
});

// Log debug info to the console
//pureCloudSession.debugLog = console.log;

// Get auth token
pureCloudSession.login()
