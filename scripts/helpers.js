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
	},
	formatCellData: function(data, type) {
		if (!data) return '';
		switch(type) {
			case 'date': {
				try {
					var date = new Date(data);

					// http://stackoverflow.com/questions/25275696/javascript-format-date-time
					var hours = date.getHours();
					var minutes = date.getMinutes();
					var ampm = hours >= 12 ? 'pm' : 'am';
					hours = hours % 12;
					hours = hours ? hours : 12; // the hour '0' should be '12'
					minutes = minutes < 10 ? '0'+minutes : minutes;
					var strTime = hours + ':' + minutes + ' ' + ampm;

					// Include date if not today
					if (date.getDate() != (new Date()).getDate())
						return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
					else
						return strTime;
				} catch(error) {
					console.error(error);
				}
			}
			default: {
				return data.toString();
			}
		}
	}
};
