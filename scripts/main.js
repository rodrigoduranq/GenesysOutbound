var usersApi;
var _me = {};
var tableRow = "";
var columna_tel = "";
var claves = {};

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
///////////////////////////////////
let opts = {
  'includeImportStatus': false, // Boolean | Include import status
  'includeSize': false // Boolean | Include size
};


/////////////////////////OBTENER INFOFMACION DE CONTACT LIST //////////////////////////////
outboundApi.getOutboundContactlistsDivisionview(Campaign.contactList.id, opts)
  .then((data) => {
//    console.log(`getOutboundContactlistsDivisionview success! data: ${JSON.stringify(data, null, 2)}`);
		claves = data.columnNames;
		columna_tel = data.phoneColumns[0].columnName;

		console.log (claves);
		console.log ('Columna Tel = ' + columna_tel);
		console.log ('Campaign.contactList.id = ' + Campaign.contactList.id);

  })
  .catch((err) => {
    console.log('There was a failure calling getOutboundContactlistsDivisionview');
    console.error(err);
  });

//////////////////////////////PREPARA FILTRO PARA CONTACT LIST //////////////////////////////////////////
			 let body = {
			    "name": "",
			    "version": 0,
			    "contactList": {
			       "id": Campaign.contactList.id,
			       "name": "",
			       "selfUri": ""
			    },
			    "clauses": [
			       {
			          "filterType": "AND",
			          "predicates": [
			             {
			                "column": columna_tel,
 											"columnType": "alphabetic",
 										  "operator": "LESS_THAN_EQUALS",   /// TODOS LOS REGISTROS
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


     ch = ch + "<table class='tabla-alternada'>"
		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
		    	ch = ch + "<td>" + clave + "</td>"
     		});
     ch = ch + "</tr>"

		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
		    	ch = ch + "<td>" + clave + "</td>"
     		});
     ch = ch + "</tr>"

		 ch = ch + "<tr>"

        claves.forEach (clave =>
		    {
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

//						 console.log(ch);

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


										$.each(data.entities, function(index, Campaign) {

												tableRow = tableRow + '<tr id="' + Campaign.id + '">' +
														'<td><b>' + Campaign.name + '</b><p>' + Campaign.contactList.name + '</td>' +
														'<td><button id="' + Campaign.id + '-button" class="elButton btn btn-default" onclick="updateRight(\'' + Campaign.name + '\')">MOSTRAR</button></td>' +   /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
													'</tr>';
					    });
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
