// 
// Runs a simple http server, waiting on port 8000 (TCP)
// When you request a "GET /" 
// (ie. point your browser to the server http://127.0.0.1:8000/ ) 
// the server responds by a signature string that tells about the 
// underlying Node environment. 

// Started using versioned name on 25.2.2021
const myName = 'miniserv v0.1.1'
const listen_port = 8000

var mySig    = undefined		// Main routine will set this
var http     = require('http')

// Config constants (string) for various MIME types the server deals out
const mimes = {
	"main": "text/plain",
	"orig": "text/plain", 
	"webs": "text/html",
	"png":  "image/png",
}

// Call once to get a static string. Don't call from within request handler
function mySignature() {
	return `${myName}, running on Node ${process.version}\n`
}

/* 
 * Validates a request route towards a static file: 
 * whether the file path is legit, and file exists
 * In 0.2.0 
 */
function validateFileRequest(fstr) {

}

// Creates the server's payload routine: this hooks to the port,
// and gets run when a Web browser issues a "GET /" request. 
var s = http.createServer(function(req,res) {
	// This goes out to console, not to the client
	console.log(`${req.method} ${req.url}`);
	res.writeHead(200, { 'content-type': 'text/plain'});
	res.end(`hello world! This comes from ${mySig}\n`);
})

// Initialize the signature string once
mySig = mySignature()
// Put server in listening mode, waiting for incoming connections. 
s.listen(listen_port);
console.log(`Server listening on ${listen_port} for HTTP requests..`);
