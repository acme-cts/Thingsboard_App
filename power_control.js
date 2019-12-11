var fetch = require('node-fetch');
var readline = require('readline');

function keyevent(e){
	if(e =="a") { //0
		console.log("=====================");
		console.log("	POWER OFF	");
		console.log("=====================");
		fetch('http://localhost:7579/Mobius/ae-test15/power0',{
			headers: {
				'Accept':'application/json',
				'Content-Type' : 'application/vnd.onem2m-res+json;ty=4',
				'Locale':'ko',
				'X-M2M-RI':'12345',
				'X-M2M-Origin':'ae-test15',
			},
			method : 'post',
			body : JSON.stringify({"m2m:cin":{"con":2}})
		})
	}
	if (e =="b") { //1
                console.log("=====================");
                console.log("   POWER ON       ");
                console.log("=====================");
                fetch('http://localhost:7579/Mobius/ae-test15/power0',{
                        headers: {
                                'Accept':'application/json',
                                'Content-Type' : 'application/vnd.onem2m-res+json;ty=4',
                                'Locale':'ko',
                                'X-M2M-RI':'12345',
                                'X-M2M-Origin':'ae-test15',
                        },
                        method : 'post',
                        body : JSON.stringify({"m2m:cin":{"con":1}})
                })
        }
}

var r = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});

r.setPrompt(" > Power Off : a \n > Power On : b \n > exit : e \n >>> ");
r.prompt();
r.on('line', function(line) {
	if((line == 'a') || (line == 'b')){
		keyevent(line);
	}
	if(line == 'e') {
		r.close();
	}
	r.prompt();
});

r.on('close', function() {
	process.exit();
});
