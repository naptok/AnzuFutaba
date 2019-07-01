// load modules
const fs = require('fs');

// Set variables
//const token = fs.readFileSync('token.txt', 'UTF8');
const port = 5000;

// Start RESTful API server
(require("./RESTfulAPI/server.js"))(port);

// Start Discord server
//(require("./Discord/server.js"))(JSON.parse(token).string, port, "--"); 