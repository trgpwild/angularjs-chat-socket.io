var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var WebsocketCtrlLoader = require('./websocketCtrlLoader');

router.use(express.static(path.resolve(__dirname, '../app')));

var websocketCtrlLoader = new WebsocketCtrlLoader(io, "/websocket_controllers/");

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Angularjs Chat Websocket Application running at:", addr.address + ":" + addr.port);
});