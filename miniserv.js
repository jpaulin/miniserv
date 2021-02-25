// 
// Runs a simple http server, waiting on port 8000 (TCP)
// When you request a "GET /" 
// (ie. point your browser to the server http://127.0.0.1:8000/ ) 
// the server responds by a signature string that tells about the 
// underlying Node environment. 

const myName = 'miniserv'
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

// Creates the server's payload routine: this hooks to the port,
// and gets run when a Web browser issues a "GET /" request. 
var s = http.createServer(function(req,res) {
	res.writeHead(200, { 'content-type': 'text/plain'});
	res.end(`hello world! This comes from ${mySig}\n`);
})

// Initialize the signature string once
mySig = mySignature()
// Put server in listening mode, waiting for incoming connections. 
s.listen(8000);
