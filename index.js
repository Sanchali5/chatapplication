var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('public')); 

var port = process.env.PORT || 8079;

app.get('/', function(req, res){       
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	// eta bol ekhon? listening to what the cliebt A is sending correct..not only A..whosoever ghoteshwar
  	socket.on('socket_key', function(msg){ 
    	io.emit('socket_key', msg);	// now after getting the msg..which is an object btw..what this line doing? it will broadcast the message received from the clients corect
  	});
});

server.listen(port, function(){
  console.log('listening on *:80');
});