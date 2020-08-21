const request = require('request');
const options = {
	url: 'http://127.0.0.1:8080/api/v1/illumacc/telemetry',
	method: 'POST',
	json: true,
	body: {
		'illuminance':77
	}
};
const get_options = {
	url: 'http://127.0.0.1:8080/api/v1/illumacc/attributes',
	method: 'GET',
}

function post(){
	request.post(options, function(error, response, body) {
		if (error) {
			console.log(error);
		}else {
			console.log(response.statusCode);
			console.log(body);
		}
	});
}

function get(){
	request.get(get_options, function(error, response, body){
		if (error) {
			console.log(error);
		}else {
			console.log(response.statusCode);
			console.log(body);
		}
	});
}

get();
