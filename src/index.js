const http = require('http');

const { getGreeting } = require('./greeting');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const params = new URLSearchParams(req.url.split('?')[1]);
  const name = params.get('name');

  res.end(getGreeting(name));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
