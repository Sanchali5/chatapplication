var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socket = require('socket.io');
var io = socket(server);
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



var routes = require('./routes');	

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sanchali@376',
	database:'chatapp'
});
	
connection.connect();
app.use(express.static('public')); 
var port = process.env.PORT || 8052; 

app.get('/', function (req, res){       
  res.sendfile('index.html');
});


routes.init(app,connection); 

io.on('connection', function(socket){
  //  
  socket.on('socket_key', function(msg){ 

    var chat = {
      
      rid:msg.rid,
      sid:msg.sid,
      msg:msg.msg 
    };
    console.log(msg.rid);

      connection.query('insert into chat set ?', chat, function (err,result){
        if(err) {
          console.error(err);
          return;
        }
        console.error(result);
       });
  		io.emit(msg.rid,msg);
  	  io.emit(msg.sid,msg);


      
  });

}); 

server.listen(port, function(){
  console.log('listening on :' + port);
}); 


