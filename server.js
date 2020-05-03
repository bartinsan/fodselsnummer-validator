const http = require('http');
const express = require('express');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

});

const app = express();

server.on('request', app);
app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
