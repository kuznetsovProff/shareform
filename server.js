let http = require('http');
let static = require('./node_modules/node-static/lib/node-static');
let file = new static.Server('.');

http.createServer(function(request, response) {
	file.serve(request, response, function (err, res) {
		 if (err) { // An error as occured
            console.error("> Error serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        } else { // The file was served successfully
            console.log("> " + request.url + " - " + res.message);
        }
	});
}).listen(8080);

console.log('Server running on port 8080');


/*
var static = require('./node_modules/node-static/lib/node-static');

//
// Create a node-static server to serve the current directory
//
var file = new static.Server('.', { cache: 7200, headers: {'X-Hello':'World!'} });

require('http').createServer(function (request, response) {
    file.serve(request, response, function (err, res) {
        if (err) { // An error as occured
            console.error("> Error serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        } else { // The file was served successfully
            console.log("> " + request.url + " - " + res.message);
        }
    });
}).listen(8080);

console.log("> node-static is listening on http://127.0.0.1:8080");
*/