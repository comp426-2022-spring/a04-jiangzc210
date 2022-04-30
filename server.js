// Require Express.js
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const HTTP_PORT = args.port || 5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

//import coin modules
function coinFlip() {
	if (Math.floor(Math.random()*2)>=1) {
			return 'heads';
		} else {
			return 'tails';
		}
}
function coinFlips(flips) {
	let response = new Array(flips);
	for (let i = 0; i<flips; i++) {
		response[i] = coinFlip();
	}
	return response;
}
function countFlips(array) {
	let t=0, h=0;
	for (let x = 0; x<array.length; x++)
		if (array[x] == 'tails')
			t++;
		else h++;
	return {heads: h, tails: t};
}
function flipACoin(call) {
	var response = {'call': call, 'flip':coinFlip(), 'result':'lose'};
	if (response.call == response.flip)
		response.result = 'win';
	return response;
}



app.get('/app/', (req, res) => {
// Respond with status 200
	res.statusCode = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
	res.json({'flip':coinFlip()});
});

app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number);
	res.json({'raw':flips, 'summary':countFlips(flips)});
});

app.get('/app/flip/call/tails', (req, res) => {
	const flips = coinFlips(req.params.number);
	res.json(flipACoin('tails'));
});

app.get('/app/flip/call/heads', (req, res) => {
	const flips = coinFlips(req.params.number);
	res.json(flipACoin('heads'));
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});




