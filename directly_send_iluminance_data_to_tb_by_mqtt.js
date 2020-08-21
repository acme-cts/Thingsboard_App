/**
 * Created by ryeubi on 2015-08-31.
 * Updated 2017.03.06
 * Made compatible with Thyme v1.7.2
 */

var net = require('net');
var util = require('util');
var serialport = require('serialport');
var Readline = require('@serialport/parser-readline');
var mqtt = require('mqtt');

var usecomport = '/dev/ttyACM0';
var usebaudrate = '9600';
var useparentport = '3100';
var useparenthostname = 'localhost';

var SerialPort = null;
var myPort = null;
var portParser = null;

var topic = 'v1/devices/me/telemetry';
var option = {
	host: '127.0.0.1',
	port: 8883,
	username: 'illumacc',
};

var client = mqtt.connect(option);
client.on('connect', ()=> {
	console.log('MQTT Client connected');
});
client.on('error', (error) => {
	console.log('MQTT Client connect failed');
});
var check = 0;
const exists = portName => SerialPort.list().then(ports => ports.some(port => port.comName === portName ));
function init_sensor() {
	SerialPort = serialport;
	
    serialport.list().then(ports => {
    	ports.forEach(function (port) {
        	console.log("PORT NAME	" + port.path);
        });
    });
	
	myPort = new SerialPort(usecomport);
	portParser = myPort.pipe(new Readline({ delimiter: '\r\n' }));
	portParser.on('data', saveLastestData);
	portParser.on('close', showPortClose);
	portParser.on('error', showError);
	if(portParser) {
		console.log('init serial ok');
	}
}

function saveLastestData(data) {
	console.log("illuminance: " + data);
	msg = {"illuminance":data}
	client.publish(topic, JSON.stringify(msg));
}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    var error_str = util.format("%s", error);
    console.log(error.message);
    if (error_str.substring(0, 14) == "Error: Opening") {
		console.log('Error : Opening')
	}
    else {
        console.log('SerialPort port error : ' + error);
    }
}

init_sensor();
