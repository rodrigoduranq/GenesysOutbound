var helpers = {
	getParameterByName: function(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return '';
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	displayQueuesList: function(queueList) {
		$.each(queueList, function(index, queue) {
			var tableRow = '<tr id="' + queue.id + '">' +
					'<td>' + queue.name + '</td>' +
					'<td><button id="' + queue.id + '-button" class="elButton btn btn-default" onclick="">MOSTRAR</button></td>' +   /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
				'</tr>';
			$('#queuesTableBody').append(tableRow);
		})
	},
	displayCampaList: function(campaList) {
		$.each(campaList, function(index, campa) {
			var tableRow = '<tr id="' + campa.id + '">' +
					'<td>' + campa.name + '</td>' +
					'<td><button id="' + campa.id + '-button" class="elButton btn btn-default" onclick="">MOSTRAR</button></td>' +   /// AGARRAR REFERENCIA DE LAS COLAS PARA ONCLICK
				'</tr>';
			$('#campaTableBody').append(tableRow);
		})
	},
};


///// toggleQueueSubscription(\'' + queue.id + '\')"
