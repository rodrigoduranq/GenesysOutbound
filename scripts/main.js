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

  let outboundApi = new platformClient.OutboundApi();
  outboundApi.getOutboundCampaigns(opts)
	.then((data) => {

      Campaign = data.entities[0];
	//		console.log (data.entities[0]);

ch = ""

			 ch = '<center><b>   Nombre de La Campaña: </b>' + Campaign.name   + '</center><p>'
			 ch = ch + '<center><b>   Nombre de La Calling List: </b>' + Campaign.contactList.name  + '</center>'
			 ch = ch + '<center><b>   Calling List Id: </b>' + Campaign.contactList.id  + '</center>'

			 ch = ch + '<center>'

			 let body = {
			    "name": "",
			    "version": 0,
			    "contactList": {
			       "id": "8ce124e1-ab62-47ae-acfd-63a34b821158",
			       "name": "",
			       "selfUri": ""
			    },
			    "clauses": [
			       {
			          "filterType": "AND",
			          "predicates": [
			             {
			                "column": "tel1",
			                "columnType": "alphabetic",
			                "operator": "ENDS_WITH",
			                "value": "0",
			                "range": {
			                   "min": "",
			                   "max": "",
			                   "minInclusive": true,
			                   "maxInclusive": true,
			                   "inSet": []
			                },
			                "inverted": true
			             }
			          ]
			       }
			    ],
			    "filterType": "AND"
				}; // Object | ContactListFilter



			 outboundApi.postOutboundContactlistfiltersPreview(body)
			   .then((data) => {
			     console.log(`postOutboundContactlistfiltersPreview success! data: ${JSON.stringify(data, null, 2)}`);

					 console.log('Longitud Preview');
	                 console.log(data.preview.length);

					 console.log('Filtered Contacts');
	                 console.log(data.filteredContacts);



/*
postOutboundContactlistfiltersPreview success!
data:
{
  "filteredContacts": 100,
  "totalContacts": 100,
  "preview": [
    {
      "id": "e2cf612d610748737f9b36ab68199865",
      "contactListId": "8ce124e1-ab62-47ae-acfd-63a34b821158",
      "data": {
        "Cliente": "301648069",
        "Nombre": "LEONARDO QUINTANA BARAJAS",
        "Domicilio": "GUANAJUATO-LEON-FLORES MAGON-CALLE SIETE-128---F",
        "EstadoCivil": "S",
        "Edad": "32",


*/


/*  Sacar todas las keys */
      const claves = [];
      data.preview.forEach(objeto => {
      Object.keys(objeto.data).forEach(clave => {
        if (!claves.includes(clave)) {
        claves.push(clave);
       }
      });
      });

      console.log ('Van las claves');
			console.log(claves);
			console.log ('Fin Claves');

     ch = ch + "<table class="tabla-alternada">"
		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
    			console.log (clave);
		    	ch = ch + "<td>" + clave + "</td>"
     		});
     ch = ch + "</tr>"

		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
    			console.log (clave);
		    	ch = ch + "<td>" + clave + "</td>"
     		});
     ch = ch + "</tr>"

		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
    			console.log (clave);
		    	ch = ch + "<td>" + clave + "</td>"
     		});
     ch = ch + "</tr>"




		 ch = ch + "</table>"


/*           for (let i = 0; i < data.preview.length; i++) {
  						 console.log(data.preview[i].id);
							 console.log(data.preview[i].data.Nombre);
							 console.log(data.preview[i].data.tel1);
						    ch = ch + data.preview[i].id + "<br>";
						 }

	*/
						 ch = ch + '</center>'

						 console.log(ch);

       document.getElementById("right").innerHTML = ch;


			   })
			   .catch((err) => {
			     console.log('There was a failure calling postOutboundContactlistfiltersPreview');
			     console.error(err);
			   });


////////////////////




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

// TENEMOS PENDIENTE CILO POR SI SON VARIAS !!!
 					 apiInstance.getOutboundCampaigns(opts)
					  .then((data) => {

	//				    console.log ("bbbbbbb bbb");
	//				    console.log (data.pageCount);

										$.each(data.entities, function(index, Campaign) {
//					              console.log (Campaign.name + "_____________________" + Campaign.contactList.name);

												tableRow = tableRow + '<tr id="' + Campaign.id + '">' +
														'<td><b>' + Campaign.name + '</b><p>' + Campaign.contactList.name + '</td>' +
														'<td><button id="' + Campaign.id + '-button" class="elButton btn btn-default" onclick="updateRight(\'' + Campaign.name + '\')">MOSTRAR</button></td>' +   /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
													'</tr>';
					    });
//							console.log ("CHECKPONIT B");

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
