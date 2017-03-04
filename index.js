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
var port = process.env.PORT || 8052; // dekha bar bar port kano change korish...error ascle change kore dish ok

app.get('/', function (req, res){       
  res.sendfile('index.html');
});


routes.init(app,connection); // ei function ta ekhon routes object er modhe

io.on('connection', function(socket){
  //  
  socket.on('socket_key', function(msg){ 

    var chat = {
      // ekahne notun kore bana...take attributes values from msg ok thankyou
      rid:msg.rid,
      sid:msg.sid,
      msg:msg.msg //eta k korbe? ouu sob kichu dekhe korte hoye oaakto chonchol hote nei..raat o to onek hoeche brain jamm hoe geche 
      // haha..aare...tale korchish kano..kal kor na icche korche ektu interesting lagche aaj bas aajke ei moto hi rakh
       // naa please output ta dekhe ghumabo ok
       
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


      //save the msg in the database whose column id matches msg.rid and msg.sid
      //msg can be rmsg or smsg
      //columns in the table id,username,pass,smsg,rmsg
  });

}); 

server.listen(port, function(){
  console.log('listening on :' + port);
}); 


