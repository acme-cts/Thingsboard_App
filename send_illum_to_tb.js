var net = require('net');
var ip = require('ip');
var fetch = require('node-fetch');
var request = require('request');
var mqtt = require('mqtt');

var option = {
		host: '127.0.0.1',
		port: 8883,
		username: "illumacc",
};
var client = mqtt.connect(option);
var topic = "v1/devices/me/telemetry";

client.on("error", function(err){
	console.log("mqtt connect error");
});

function value(){
        console.log("==============================\n");
        fetch('http://127.0.0.1:7579/Mobius/ae-test15/cnt-illuminance/latest',{
                headers: {
                        'Accept':'application/json',
                        'X-M2M-RI' : '12345',
                        'X-M2M-Origin' : 'ae-test15'
                },
                method : 'get',
        })
        .then(response => response.json())
        .then(function(data) {
                var obj = data["m2m:cin"];
                console.log("obj : " + obj + "\n");
                sensorvalue = obj.con;

                console.log("SENSOR VALUE : " + sensorvalue + "\n");
                console.log("==============================\n");

				var i_data = {"illuminance": sensorvalue};
				client.publish(topic ,JSON.stringify(i_data));
	});
}

setInterval(function(){value();},3000);
