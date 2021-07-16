// HTTP, URL, and FS modules importation
const http = require('http'),
  fs = require('fs'),
  url = require('url');

// Server creation function from HTTP module
http.createServer((request, response) => {
  let addr = request.url,
    q = url.parse(addr , true),
    filePath = '';

// Server "Requests" Log
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

// Verification of pathname "documentation"
  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

// Request Listener on port 8080
}).listen(8080);
console.log('My test server is running on Port 8080.');
