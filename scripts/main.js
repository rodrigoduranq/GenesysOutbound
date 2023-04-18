var usersApi;
var _me = {};
var tableRow = "";
var columna_tel = "";
var claves = {};
var cdato = {};
var primeraCampana = "";
var idcallinglist = "";
var G_CampaignName = "";
const platformClient = require('platformClient');



function Exportar_Calling()
{
}


function Delete_Record(contactListId, contactId) {
    let apiInstance = new platformClient.OutboundApi();
    apiInstance.deleteOutboundContactlistContact(contactListId, contactId)
        .then(() => {
            console.log('deleteOutboundContactlistContact returned successfully.');
        })
        .catch((err) => {
            console.log('There was a failure calling deleteOutboundContactlistContact');
        });
}

function Borrar_Registro() {
    let opciones = document.getElementsByName("fila");
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            let id = opciones[i].value;
            Delete_Record(idcallinglist, id);
            updateRight(G_CampaignName);
            return;
        }
    }
    alert("Debe seleccionar una fila");
}

function Anadir_Registro2(){
  let apiInstance = new platformClient.OutboundApi();

  let contactListId = "fb807af5-f92c-4185-89af-dc58738393a7"; // String | Contact List ID

  let body = [
    {
      "id": "",
      "contactListId": contactListId,
      "data": {

          "clientId": "123456",
          "name": "Juan Perez",
          "phone": "555-1234"
         },
         "callable": true,
        "phoneNumberStatus": {
          "mobilePhone": {"callable": true},
          "homePhone": {"callable": true}
      }
    }
    ]; // Object | Contact
  let opts = {
    'priority': true, // Boolean | Contact priority. True means the contact(s) will be dialed next; false means the contact will go to the end of the contact queue.
    'clearSystemData': true, // Boolean | Clear system data. True means the system columns (attempts, callable status, etc) stored on the contact will be cleared if the contact already exists; false means they won't.
    'doNotQueue': true // Boolean | Do not queue. True means that updated contacts will not have their positions in the queue altered, so contacts that have already been dialed will not be redialed. For new contacts, this parameter has no effect; False means that updated contacts will be re-queued, according to the 'priority' parameter.
  };

  apiInstance.postOutboundContactlistContacts(contactListId, body, opts)
    .then((data) => {
      console.log(`postOutboundContactlistContacts success! data: ${JSON.stringify(data, null, 2)}`);
    })
    .catch((err) => {
      console.log('There was a failure calling postOutboundContactlistContacts');
      console.error(err);
    });

}

function Anadir_Registro() {

			var fila = document.getElementById("registros_nuevos");
		  var inputs = fila.querySelectorAll("input");
      var valores = [];
      let apiInstance = new platformClient.OutboundApi();

      let body = [
        {
          "id": "",
          "contactListId": idcallinglist,
          "data": {},
             "callable": true,
            "phoneNumberStatus": {
              "mobilePhone": {"callable": true},
              "homePhone": {"callable": true}
          }
        }
        ]; // Object | Contact

			for (var i = 0; i < inputs.length; i++) {
        body[0].data[inputs[i].name] = inputs[i].value;
			}


      let opts = {
        'priority': true, // Boolean | Contact priority. True means the contact(s) will be dialed next; false means the contact will go to the end of the contact queue.
        'clearSystemData': true, // Boolean | Clear system data. True means the system columns (attempts, callable status, etc) stored on the contact will be cleared if the contact already exists; false means they won't.
        'doNotQueue': true // Boolean | Do not queue. True means that updated contacts will not have their positions in the queue altered, so contacts that have already been dialed will not be redialed. For new contacts, this parameter has no effect; False means that updated contacts will be re-queued, according to the 'priority' parameter.
      };

      apiInstance.postOutboundContactlistContacts(idcallinglist, body, opts)
        .then((data) => {
          console.log(`postOutboundContactlistContacts success! data: ${JSON.stringify(data, null, 2)}`);
        })
        .catch((err) => {
          console.log('There was a failure calling postOutboundContactlistContacts');
          console.error(err);
        });

    return valores;

}


function updateRight(NombreCampana) {
    G_CampaignName = NombreCampana;
    if (NombreCampana == "") {
        NombreCampana = primeraCampana
    }
    let opts = {
        'pageSize': 100, // Number | Page size. The max that will be returned is 100.
        'pageNumber': 1, // Number | Page number
        'name': NombreCampana, // String | Name
    };
    let outboundApi = new platformClient.OutboundApi();
    outboundApi.getOutboundCampaigns(opts)
        .then((data) => {
            Campaign = data.entities[0];
            ch = ""
            $('#N_Campana').html(Campaign.name);
            $('#N_CallingList').html(Campaign.contactList.name);
            idcallinglist = Campaign.contactList.id;
            outboundApi.getOutboundCampaign(Campaign.id)
                .then((cdato) => {
                    /*  console.log(`getOutboundCampaign success! data: ${JSON.stringify(data, null, 2)}`); */
                    console.log('Estatus de la campaña' + cdato.campaignStatus);
                    $('#N_Status').html(cdato.campaignStatus);
                    if (cdato.campaignStatus == "off") {
                        DesactivaBoton();
                    } else {
                        ActivaBoton();
                    }
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
                        "clauses": [{
                            "filterType": "AND",
                            "predicates": [{
                                "column": columna_tel,
                                "columnType": "alphabetic",
                                "operator": "EQUALS", /// TODOS LOS REGISTROS
                                "value": "0",
                                "range": {
                                    "min": "",
                                    "max": "",
                                    "minInclusive": true,
                                    "maxInclusive": true,
                                    "inSet": []
                                },
                                "inverted": true
                            }]
                        }],
                        "filterType": "AND"
                    }; // Object | ContactListFilter
                    //		console.log (claves);
                    console.log('Columna Tel = ' + columna_tel);
                    console.log('Campaign.contactList.id = ' + Campaign.contactList.id);
                    outboundApi.postOutboundContactlistfiltersPreview(body)
                        .then((data) => {
                            /*    console.log ('Aqui va Data');
                            		console.log (data); */
                            ch = ch + "<table class='tabla-alternada'>"
                            ch = ch + "<thead><tr>"
                            ch = ch + "<td></td>"
                            claves.forEach(clave => {
                                ch = ch + "<th>" + clave + "</th>"
                            });
                            ch = ch + "</tr></thead>"
                            idfila = 0
                            data.preview.forEach(registro => {
                                ch = ch + "<tr>"
                                console.log(registro.id);
                                idfila = idfila + 1
                                ch = ch + "<td><input type='radio' name='fila' value='" + registro.id + "'></td>"
                                claves.forEach(clave => {
                                    ch = ch + "<td>"
                                    for (let key in registro.data) {
                                        const llave = key;
                                        const valor = registro.data[key];
                                        //                  console.log(`La clave es: ${llave} y el valor es: ${valor}`);
                                        if (llave == clave) {
                                            elvalor = valor;
                                        }
                                    }
                                    ch = ch + elvalor + "</td>"
                                });
                                ch = ch + "</tr>"
                            });
                            if (true) {

                                ch = ch + "<tr id = 'registros_nuevos' >"
                                ch = ch + "<td></td>"
                                claves.forEach(clave => {
                                    ch = ch + "<td><input type='text' name='" + clave + "' required minlength='4' maxlength='8' size='10'></td>"
                                });
                                ch = ch + "</tr>"
                            }
                            ch = ch + "</table>"
                            //						 console.log(ch);
                            ////   document.getElementById("right").innerHTML = ch;
                            $('#right').html(ch);
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
            users.getUsersMe().then(function(userObject) {
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
                            primeraCampana = Campaign.name;
                            tableRow = tableRow + '<tr id="' + Campaign.id + '">' +
                                '<td><b>' + Campaign.name + '</b><p>' + Campaign.contactList.name + '</td>' +
                                '<td><button id="' + Campaign.id + '-button" class="elButton btn btn-default" onclick="updateRight(\'' + Campaign.name + '\')">MOSTRAR</button></td>' + /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
                                '</tr>';
                        });
                        $('#Campanas').html(tableRow);
                    });
            });
            // Do authenticated things
        })
        .catch((err) => {
            // Handle failure responseS
            console.log(err);
        });
});
