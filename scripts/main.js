var pureCloudSession;
var usersApi;
var routingApi;
var outboundApi;

var _me = {};
var _queues = [];
var _campas = [];
var apiInstance;

$(document).ready(function() {
	// Create PC session
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
			outboundApi = new purecloud.platform.OutboundApi(pureCloudSession);

//let apiInstance = new pureCloudSession.OutboundApi();

     prueba();
			// Get the user's data (to verify token) and return the promise
			return usersApi.getMe();
		})
		.then(function(getMeResult) {
			console.log(getMeResult);
      console.log ('Hello World');
			// Store the "me" object
			_me = getMeResult;

			// Get list of queues (function wraps API calls)
			return getQueues();
		})
		.then(function(queuesList) {
			// Save result
			_queus = queuesList;

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

  console.log('En getQueueImpl ');

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






// Get the list of campas. Returns a promise
function getCampas(pageSize = 100, pageNumber = 1, sortBy, name, active) {
	return new Promise(function(fulfill, reject) {
		getCampasImpl([], pageSize, pageNumber, sortBy, name, active, fulfill, reject);
	});
}

// Implementation of get queues to recursively get all queues and fulfill the promise when done
function getCampasImpl(campasList, pageSize, pageNumber, sortBy, name, active, fulfill, reject) {

  console.log('v2 En getCampasImpl ');

	outboundApi.getOutboundCampaigns(pageSize, pageNumber, sortBy, name, active)
			.then(function(getCampasResponse) {
				try {
					// Append to list
					$.each(getCampasResponse.entities, function(index, queue) {
						campasList.push(campaign);
					});

					if (getCampasResponse.nextUri) {
						// Recurse
						console.log('Getting more queues from page ' + (getCampasResponse.pageNumber + 1));
						getQueuesImpl(queuesList,
							getCampasResponse.pageSize,
							getCampasResponse.pageNumber + 1,
							sortBy,
							name,
							active,
							fulfill,
							reject);
					} else {
						// Fulfill promise
						fulfill(campasList);
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




function prueba () {

	let opts = {
	  'pageSize': 25, // Number | Page size. The max that will be returned is 100.
	  'pageNumber': 1, // Number | Page number
	  'sortBy': "", // String | Sort by
	  'sortOrder': "ascending" // String | Sort order
	};

	apiInstance.getOutboundCampaigns(opts)
	  .then((data) => {
	    console.log(`getOutboundCampaigns success! data: ${JSON.stringify(data, null, 2)}`);
	  })
	  .catch((err) => {
	    console.log('There was a failure calling getOutboundCampaigns');
	    console.error(err);
	  });



}
/*
let apiInstance = new platformClient.OutboundApi();

let opts = {
  'pageSize': 25, // Number | Page size. The max that will be returned is 100.
  'pageNumber': 1, // Number | Page number
  'sortBy': "", // String | Sort by
  'sortOrder': "ascending" // String | Sort order
};

apiInstance.getOutboundCampaigns(opts)
  .then((data) => {
    console.log(`getOutboundCampaigns success! data: ${JSON.stringify(data, null, 2)}`);
  })
  .catch((err) => {
    console.log('There was a failure calling getOutboundCampaigns');
    console.error(err);
  });

*/
