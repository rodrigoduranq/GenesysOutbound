var usersApi;
var _me = {};
var tableRow = "";
var columna_tel = "";
var claves = {};
var cdato = {};

const platformClient = require('platformClient');

function updateRight(NombreCampana)
{
	let opts =
	{
		'pageSize': 100, // Number | Page size. The max that will be returned is 100.
		'pageNumber': 1, // Number | Page number
    'name': NombreCampana, // String | Name
	};

  let outboundApi = new platformClient.OutboundApi();
  outboundApi.getOutboundCampaigns(opts)
	.then((data) =>
	{

      Campaign = data.entities[0];

       ch = ""

			 ch = '<b>   Nombre de La Campaña: </b>' + Campaign.name   + '<p>'
			 ch = ch + '<b>   Nombre de La Calling List: </b>' + Campaign.contactList.name + '<p><p>'



ch = ch + '			 <label class="mi-checkbox">'
ch = ch + '	       <input type="checkbox" id="mi-checkbox">'
ch = ch + '	       <span class="mi-checkbox-span"></span>'
ch = ch + '	       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Iniciada' + Campaign.name
ch = ch + '	     </label>'




apiInstance.getOutboundCampaign(Campaign.Id)
  .then((cdato) => {
    console.log(`getOutboundCampaign success! data: ${JSON.stringify(data, null, 2)}`);
		console.log ('iniciada' + cdato.campaignStatus);

  })
  .catch((err) => {
    console.log('There was a failure calling getOutboundCampaign');
    console.error(err);
  });



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
									 "operator": "EQUALS",   /// TODOS LOS REGISTROS
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

//		console.log (claves);
	 	console.log ('Columna Tel = ' + columna_tel);
	 	console.log ('Campaign.contactList.id = ' + Campaign.contactList.id);


		outboundApi.postOutboundContactlistfiltersPreview(body)
			.then((data) => {

    console.log ('Aqui va Data');
		console.log (data);

	ch = ch + "<table class='tabla-alternada'>"
	ch = ch + "<thead><tr>"

		 claves.forEach (clave =>
		 {
			 ch = ch + "<th>" + clave + "</th>"
		 });
	ch = ch + "</tr></thead>"


	data.preview.forEach (registro =>
{

     ch = ch + "<tr>"
		 console.log (registro.data);

		 claves.forEach (clave =>
			 {
     ch = ch + "<td>"
	       	for (let key in registro.data) {
                  const llave = key;
                 const valor = registro.data[key];
//                  console.log(`La clave es: ${llave} y el valor es: ${valor}`);

									if (llave == clave) {
									  elvalor = valor;
									}
                }
								ch = ch +elvalor +"</td>"

		});
		ch = ch + "</tr>"
	});


/*
    data.preview.forEach (registro =>
			{
            registro.preview.data.forEach (campo =>
							{
                     console.log (campo);

							});
			});

/*

// Recorremos cada elemento del array
data.forEach(function(elemento) {
  // Recorremos cada propiedad del objeto
  Object.keys(elemento).forEach(function(clave) {
    // Obtenemos el valor correspondiente a la clave
    var valor = elemento[clave];
    console.log(clave + ': ' + valor);
  });
});

*/

	ch = ch + "</table>"


//						 console.log(ch);

document.getElementById("right").innerHTML = ch;


  })
  .catch((err) => {
    console.log('There was a failure calling getOutboundContactlistsDivisionview');
    console.error(err);
  });





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
