var usersApi;
var _me = {};
var tableRow = "";

const platformClient = require('platformClient');

function readCSV(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.send();

	req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
			var lines = req.responseText.split("\n");

			var table = "<table>";
			for (var i = 0; i < lines.length; i++) {
				var cells = lines[i].split(",");

				table += "<tr>";
				for (var j = 0; j < cells.length; j++) {
					table += "<td>" + cells[j] + "</td>";
				}
				table += "</tr>";
			}
			table += "</table>";

			document.getElementById("output").innerHTML = table;
		}
	};
}




function updateRight(NombreCampana) {

	let opts = {
		'pageSize': 100, // Number | Page size. The max that will be returned is 100.
		'pageNumber': 1, // Number | Page number
    'name': NombreCampana, // String | Name
	};

  let apiInstance = new platformClient.OutboundApi();
  apiInstance.getOutboundCampaigns(opts)
	.then((data) => {

      Campaign = data.entities[0];
	//		console.log (data.entities[0]);

			 ch = '<center><b>   Nombre de La Campaña: </b>' + Campaign.name   + '</center><p>'
			 ch = ch + '<center><b>   Nombre de La Calling List: </b>' + Campaign.contactList.name  + '</center>'
			 ch = ch + '<center><b>   Calling List Id: </b>' + Campaign.contactList.id  + '</center>'


/////////////////////

let contactListId = Campaign.contactList.id; // String | ContactList ID
let opts = {
  'download': "false" // String | Redirect to download uri
};

apiInstance.postOutboundContactlistExport(contactListId)
  .then((data) => {
    console.log(`postOutboundContactlistExport success! data: ${JSON.stringify(data, null, 2)}`);
  })
  .catch((err) => {
    console.log('There was a failure calling postOutboundContactlistExport');
    console.error(err);
  });

	apiInstance.getOutboundContactlistExport(contactListId, opts)
	.then((data) => {
	    console.log(`getOutboundContactlistExport success! data: ${JSON.stringify(data, null, 2)}`);

			readcsv(data.uri);
			
	  })
	  .catch((err) => {
	    console.log('There was a failure calling getOutboundContactlistExport');
	    console.error(err);
	  });



////////////////////


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
