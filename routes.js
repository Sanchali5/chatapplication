// here we will define all routes
// like this u create a module
module.exports = { 	
	init: function(app,connection){

		app.get('/fetch/users', function (req, res){    
		    console.log(req.query.myid);   
		    var mid = req.query.myid;
			connection.query('select id,username from user where id != ?',[mid],function (err,result){	// dekh..connection tao nei...so how can u access the connection?parametr kor
				if(err) {
					console.error(err); // oho...call toh kor
					return;
				}
				res.send(result); // test puro code dekh..common sense
			});
		});



		app.get('/prefill/chat', function (req, res){
			// here ur getting the ids of the 2 users..ok
			
			var sid = req.query.sid;
			var rid = req.query.rid;
			// ekahane ki select korchish..msg yo
			//select username,msg from chat,user where user.id in(6,7) and chat.sid=user.id;
			// result toh thik dekhache..but syntax ta ektu bhul..dekhe bol nicher line ta
			connection.query('select msg,username from chat,user where user.id in (?,?) and  (user.id= chat.sid )',[sid,rid],function (err,result){	// dekh..connection tao nei...so how can u access the connection?parametr kor
				if(err) {
					console.error(err); // oho...call toh kor
					return;
				}
				res.send(result); // test puro code dekh..common sense
			});



		});
		app.post('/auth/login', function (req, res){ 

			connection.query('select id,username from user where username = ? and pass = ?', [req.body.username, req.body.pass], function (err,result){	
				if(err) {
					console.error(err);
					return;
				}
				res.send(result);
			});	

		});// tyi kalke bolli select r sathe user er ki dorkar aaj kano dili ouu 


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
	} 
};