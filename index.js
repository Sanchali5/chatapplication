var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socket = require('socket.io');
var io = socket(server);
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// now u want ur module hereok
var routes = require('./routes');	// ei routes ta hoeche the file routes.jsouuk

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sanchali@376',
	database:'chatapp'
});
	
connection.connect();
app.use(express.static('public')); 
var port = process.env.PORT || 8975; // dekha

app.get('/', function (req, res){       
  res.sendfile('index.html');
});


routes.init(app,connection); // ei function ta ekhon routes object er modhe

io.on('connection', function(socket){
  // 
  socket.on('socket_key', function(msg){
  		io.emit(msg.rid,msg);
  		io.emit(msg.sid,msg);
  });
}); 

server.listen(port, function(){
  console.log('listening on :' + port);
}); 


