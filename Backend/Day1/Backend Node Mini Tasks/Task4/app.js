
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile('requests.log', logEntry, (err) => {
    if (err){
      console.log(err);
      
    };
  });

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Node');
});

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
