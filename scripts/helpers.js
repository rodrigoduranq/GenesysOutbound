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
					'<td><button id="' + queue.id + '-button" class="queueButton btn btn-default" onclick="">SUBSCRIBE</button></td>' +
				'</tr>';
			$('#queuesTableBody').append(tableRow);
		})
	}
};
