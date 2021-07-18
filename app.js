require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

app.get('/', function (req, res) {
  res.redirect(process.env.FRONTEND_URL_ADDRESS_WITH_PORT)
});

app.set('port', 9000);
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "./sensr/bin/data/keys/sensr-ca.key")),
    cert: fs.readFileSync(path.join(__dirname, "./sensr/bin/data/keys/sensr-ca.crt"))
  }, app);

const wss = new WebSocket.Server({ server: server, rejectUnauthorized: false });

wss.on('connection', function connection(ws) {
    console.log('connection');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('say something');
});

server.listen(9000);
server.on('error', onError);
server.on('listening',  onListening);

function onError(error) {
  console.log("error");
}

function onListening() {
  console.log("listening on port 9000")
}
