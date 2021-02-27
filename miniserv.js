// 
// Runs a simple http server, waiting on port 8000 (TCP)
// When you request a "GET /" 
// (ie. point your browser to the server http://127.0.0.1:8000/ ) 
// the server responds by a signature string that tells about the 
// underlying Node environment. 

// Started using versioned name on 25.2.2021
const myName      = 'miniserv v0.3.0'
const listen_port = 8000
var http          = require('http')
const chalk       = require('chalk')
const fs          = require('fs')
const fssani      = require("sanitize-filename")

// Config constants (string) for various MIME types the server deals out
const mimes = {
	"main": "text/plain",
	"orig": "text/plain", 
	"webs": "text/html",
	"png":  "image/png",
}


/** 
 * 
 */
function logRequest(btext) {
	fs.writeFileAsync()
}

/* 
 * Validates a request route towards a static file: 
 * whether the file path is legit, and file exists
 * In 0.2.0 
 */
function validateFileRequest(fstr) {
	// Check for a file name to be "flat", ie. does not climb folders up or down
	// * no '..' 2 consequtive commas may be present
	// * fstr must not point to a folder (only files are o.k.)
	// * NO zero bytes (value of char == 0) allowed in fstr.
	var safeFile = fssani.sanitize(fstr)
	console.log(chalk.green("File req: " + fstr + " => " +safeFile))
	try {
	    await fs.promises.access(safeFile)
	    console.log(chalk.green("Access granted."))
	    return true
	} catch (error) {
		console.log(chalk.red("File not found, or false path."))
	    return false
	}
}

// Creates the server's payload routine: this hooks to the port,
// and gets run when a Web browser issues a "GET /" request. 
var s = http.createServer(function(req,res) {
	// This debug info goes to console (for admin to read), not to the client
	console.log(`${req.method} ${req.url}`)
	var wantedFile = req.url
	console.log(`Validating request for file: ${wantedFile}`)
	// Check access controls: is file request ok?
	if (!validateFileRequest(wantedFile)) {
		// Violation
		res.writeHead(404)
		res.end('Access denied, file not found or malformed file name.')
	} else {
		fs.readFile(__dirname + wantedFile, function (err,data) {
			if (err) {
		  		res.writeHead(404)
		  		res.end(JSON.stringify(err))
		  		return
			}
			console.log('200 OK')
			// res.writeHead(200, { 'content-type': 'application/octet-stream'})

			// let's write the file as-is, on screen. 
			res.writeHead(200, { 'content-type': 'text/plain'})

			console.log('..and sending file contents.')
			res.end(data)
			console.log('Request handled.')
		})
	}
});

// Put server in listening mode, waiting for incoming connections. 
s.listen(listen_port);
console.log(`Server listening on ${listen_port} for HTTP requests..`);
