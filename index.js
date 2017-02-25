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
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sanchali@376',
	database:'chatapp'
});
	
connection.connect();
app.use(express.static('public')); 
var port = process.env.PORT || 8095; // dekha

app.get('/', function(req, res){       
  res.sendfile('index.html');
});




app.get('/fetch/users', function (req, res){       
	connection.query('select id,username from user',function (err,result){	
		if(err) {
			console.error(err);
			return;
		}
		res.send(result); // test puro code dekh..common sense
	});
});



app.post('/signup', function (req, res) {
	
     var user = {
	      
	      username:req.body.username,	// now..post e ur sending these parameters no? yo so postman e ei gulo de kikore
	      pass:req.body.pass
     };

     console.log('user');
     connection.query('insert into user set ?', user, function (err,result){
	     if(err) {
	     	console.error(err);
	     	return;

	     }
	     console.error(result);
     });
     console.log('user');

     res.send('submitted');
  
});

io.on('connection', function(socket){
	// eta bol ekhon? listening to what the cliebt A is sending correct..not only A..whosoever ghoteshwar
  	socket.on('socket_key', function(msg){ 
    	io.emit('socket_key', msg);	// now after getting the msg..which is an object btw..what this line doing? it will broadcast the message received from the clients corect
  	});
});

server.listen(port, function(){
  console.log('listening on :' + port);
}); 
