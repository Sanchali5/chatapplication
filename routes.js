
module.exports = { 	
	init: function(app,connection){

		app.get('/fetch/users', function (req, res){    
		    console.log(req.query.myid);   
		    var mid = req.query.myid;
			connection.query('select id,username from user where id != ?',[mid],function (err,result){	 
				if(err) {
					console.error(err); 
					return;
				}
				res.send(result); 
			});
		});



		app.get('/prefill/chat', function (req, res){
			
			
			var sid = req.query.sid;
			var rid = req.query.rid;
			
			connection.query('select msg,username from chat,user where user.id in (?,?) and  (user.id= chat.sid )',[sid,rid],function (err,result){	
				if(err) {
					console.error(err); 
					return;
				}
				res.send(result); 
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

		});

		app.post('/signup', function (req, res) {
			
		     var user = {
			      
			      username:req.body.username,	
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