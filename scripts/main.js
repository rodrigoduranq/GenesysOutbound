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

$(document).ready(function()
{

	console.log("BREAKPOINT 1");

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
.then(function() {
	// Initialize API instances
	usersApi = new purecloud.platform.UsersApi(pureCloudSession);
	routingApi = new purecloud.platform.RoutingApi(pureCloudSession);
	notificationsApi = new purecloud.platform.NotificationsApi(pureCloudSession);

	// Get the user's data (to verify token) and return the promise
	return usersApi.getMe();
})
.then(function(getMeResult) {
	console.log(getMeResult);
	console.log("BREAKPOINT 2");

	// Store the "me" object
	_me = getMeResult;




	// Get list of queues (function wraps API calls)
	return getQueues();
})
.then(function(queuesList) {
	// Save result
	_queues = queuesList;

	// Add to UI
	helpers.displayQueuesList(_queues);

	// Enable clipboard
	new Clipboard('.clipbutton');
})
.catch(function(error){
	console.error(error);
});
});

// Get the list of queues. Returns a promise
function getQueues(pageSize = 100, pageNumber = 1, sortBy, name, active) {
return new Promise(function(fulfill, reject) {
getQueuesImpl([], pageSize, pageNumber, sortBy, name, active, fulfill, reject);
});
}

// Implementation of get queues to recursively get all queues and fulfill the promise when done
function getQueuesImpl(queuesList, pageSize, pageNumber, sortBy, name, active, fulfill, reject) {
// Invoke API
routingApi.getQueues(pageSize, pageNumber, sortBy, name, active)
	.then(function(getQueuesResponse) {
		try {
			// Append to list
			$.each(getQueuesResponse.entities, function(index, queue) {
				queuesList.push(queue);
			});

			if (getQueuesResponse.nextUri) {
				// Recurse
				console.log('Getting more queues from page ' + (getQueuesResponse.pageNumber + 1));
				getQueuesImpl(queuesList,
					getQueuesResponse.pageSize,
					getQueuesResponse.pageNumber + 1,
					sortBy,
					name,
					active,
					fulfill,
					reject);
			} else {
				// Fulfill promise
				fulfill(queuesList);
			}
		} catch (error) {
			console.log(error);
			reject(error);
		}
	})
	.catch(function(error){
		console.log(error);
		reject(error);
	});
}
