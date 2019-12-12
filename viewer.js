var net = require('net');
var ip = require('ip');
var fetch = require('node-fetch');
var request = require('request');

function value(){
        console.log("==============================\n");
        fetch('http://127.0.0.1:7579/Mobius/ae-test16/cnt-light/latest',{
                headers: {
                        'Accept':'application/json',
                        'X-M2M-RI' : '12345',
                        'X-M2M-Origin' : 'ae-test16'
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
        });
}

setInterval(function(){value();},3000);
