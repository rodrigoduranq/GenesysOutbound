var pureCloudSession;
var usersApi;
var routingApi;
var notificationsApi;

const TOPIC_CONVERSATIONS = 'v2.routing.queues.{id}.conversations';
const TOPIC_CONVERSATIONS_REGEX = /v2\.routing\.queues\.([a-z0-9\-]{36})\.conversations/;

var _me = {};
var _webSocket;
var _channelId;
var _queues = [];



$(document).ready(function() {


	const client = platformClient.ApiClient.instance;
	client.loginImplicitGrant('60feb42b-6ef0-4761-ad7f-95ac491ee688', window.location.href)
	  .then((data) => {
	    console.log(data);

			//use that session to interface with the API
			var users = new platformClient.UsersApi();

			console.log("getting ME");
			users.getUsersMe().then(function(userObject){

			    console.log("got me");
			    console.log(userObject);
			    console.log("done");
					console.log(userObject.email);


					let apiInstance = new platformClient.OutboundApi();

					let opts = {
					  'pageSize': 100, // Number | Page size. The max that will be returned is 100.
					  'pageNumber': 1, // Number | Page number
					};

					apiInstance.getOutboundCampaigns(opts)
					  .then((data) => {

					    console.log ("CHECKPONIT X");
					    console.log (data.pageCount);
					//    console.log(`getOutboundCampaigns success! data: ${JSON.stringify(data, null, 2)}`);


										$.each(data.entities, function(index, Campaign) {
					              console.log (Campaign.name + "_____________________" + Campaign.contactList.name);
					///              console.log (Campaign.contactList.name);

					    });
							console.log ("CHECKPONIT Y");

							tableRow = "<tr><th>Nombre</th><th>Apellido</th><th>Edad al momento de la muerte</th></tr><tr><td>Frida</td><td>Kahlo</td><td>47</td></tr><tr><td>Diego</td><td>Rivera</td><td>70</td></tr><tr><td>Emiliano</td><td>Zapata</td><td>47</td></tr>";


						 $('#queuesTableBody').append(tableRow);


					  });

			});




	    // Do authenticated things
	  })
	  .catch((err) => {
	    // Handle failure responseS
	    console.log(err);
	  });



});
