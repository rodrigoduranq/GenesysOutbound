var usersApi;
var _me = {};
var tableRow = "";

const platformClient = require('platformClient');

function updateRight(NombreCampana) {

	let opts = {
		'pageSize': 100, // Number | Page size. The max that will be returned is 100.
		'pageNumber': 1, // Number | Page number
    'name': NombreCampana, // String | Name
	};

  let apiInstance = new platformClient.OutboundApi();
  apiInstance.getOutboundCampaigns(opts)
	.then((data) => {

			console.log (data);

			 ch = '<center><b>' + NombreCampana + '<b></center>'
       document.getElementById("right").innerHTML = ch;



  })

}



$(document).ready(function() {
	const client = platformClient.ApiClient.instance;
	client.loginImplicitGrant('60feb42b-6ef0-4761-ad7f-95ac491ee688', window.location.href)
	  .then((data) => {
	    console.log(data);

			//use that session to interface with the API
			var users = new platformClient.UsersApi();

			users.getUsersMe().then(function(userObject){

			    console.log("got me");
			    console.log(userObject);

					let apiInstance = new platformClient.OutboundApi();

					let opts = {
					  'pageSize': 100, // Number | Page size. The max that will be returned is 100.
					  'pageNumber': 1, // Number | Page number
					};

// FALTARIA CICLAR
 					 apiInstance.getOutboundCampaigns(opts)
					  .then((data) => {

					    console.log ("bbbbbbb bbb");
					    console.log (data.pageCount);

										$.each(data.entities, function(index, Campaign) {
					              console.log (Campaign.name + "_____________________" + Campaign.contactList.name);

												tableRow = tableRow + '<tr id="' + Campaign.id + '">' +
														'<td><b>' + Campaign.name + '</b><p>' + Campaign.contactList.name + '</td>' +
														'<td><button id="' + Campaign.id + '-button" class="elButton btn btn-default" onclick="updateRight(\'' + Campaign.name + '\')">MOSTRAR</button></td>' +   /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
													'</tr>';
					    });
							console.log ("CHECKPONIT B");

						 $('#Campanas').append(tableRow);
					  });
			});


	    // Do authenticated things
	  })
	  .catch((err) => {
	    // Handle failure responseS
	    console.log(err);
	  });

});
