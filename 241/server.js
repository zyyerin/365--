var express = require("express");

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

console.log("server running");

// import socket.io
var socket = require("socket.io");
// the thing tracks input & output
var io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
	console.log("new connection: " + socket.id);

	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
		// io.socket.emit('mouse', data);
		console.log(data);
	}


}