var app = angular.module('myApp', ["ngRoute"]);
app.directive('onEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.onEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});
app.config(function($routeProvider, $locationProvider)
{
    // runit
   $routeProvider
        .when("/signup",{
            templateUrl:"/signup.html",
            controller:"SignupController"
        })
        .when("/",{
            templateUrl:"/template.html",
            controller:"TemplateController"
      
        })
        .when("/friend",{
            templateUrl:"/friend.html",
            controller:"FriendController"
      
        })
        
      
        .when("/chatroom",{
            templateUrl:"/chat.html",
            controller:"ChatController"
      
        });
 // ei gulo angular e route..means..frontend e virtual routes...okay 
});
app.controller("SignupController",function ($scope, $http)
{
    // line wise code ta bojha amay
    $scope.signup = function(){
        var data = {//object data created
             username: $scope.username,// attributes are extracted from the one the user inputs
             pass: $scope.pass            
        };

        $http.post('/signup',data).then(function (response){ //ajax request from frontend to backend
            console.log(response);
            window.location='/'; // cool..validation and all pore kore nish ok 

        },function (error){
            
            console.log(error);

        });

    };
});
app.controller("FriendController",function ($scope,$http)
{
    // ekhane redirect hoeche toh? yo 
    $http.get('/fetch/users').then(function (response) {
        console.log(response.data);
        $scope.lists= response.data;
        
    
  }, function (error) {

        console.log(error);
  });
     $scope.choose_friend = function(user){
        
          console.log(user.id);
          localStorage.setItem('friend_id',user.id);
          window.location='/#!/chatroom';  
        };
          
        //       
    
});
app.controller("ChatController",function ($scope)
{
	$scope.chatList = [];
    
	$scope.m = '';// it is used to store the message the client writes? yeaa...2 way bindin hoye gelo html er saathe...whatever is inside scope...its available in html too..make this clear in ur mind
	$scope.socket = io(); 
    $scope.my_name =localStorage.getItem('key1'); 

    $scope.sendChatMessage = function(){
        //der? dekhli nato
        

        var newMsg = new Object();
        newMsg.name = $scope.my_name;
        newMsg.message = $scope.m;
        newMsg.sid =  localStorage.getItem('key2');
        newMsg.rid =  localStorage.getItem('friend_id');

         if($scope.m)
         {
        	$scope.socket.emit('socket_key', newMsg);  
            $scope.m = '';
            return false; // emni run toh korche ? yo but 1 to 1 na dekhi dara
        }
    };                    


    $scope.socket.on(localStorage.getItem('key2'),function(msg){  // this where ur listening...so tui 'key2' kano listen korchish? ami oi msg gulo listen krbo jeta amay pathache so key2 amar id key2 thodai id tor..key2 toh string ekta toookeoo ooo
    	$scope.chatList.push(msg);
        $scope.$apply();
    });


});
app.controller("TemplateController",function ($scope,$rootScope,$http)
{
    $scope.my_name=""; 
     $scope.my_pass=""; 
     $scope.login=function(){
        var data = {//object data created
             username: $scope.my_name,// attributes are extracted from the one the user inputs
             pass: $scope.my_pass           
        };
        $http.post('/auth/login',data).then(function (response) {

                console.log(response.data);

                if(response.data.length>0) 
                {
                    localStorage.setItem('key1',response.data[0].username);
                    localStorage.setItem('key2',response.data[0].id);
                    window.location = '/#!/friend';
                    // wanna play? what noo uiz up hmmm...chain? ota ki? aar etui khelatishna molecules aaerer...ota multiplayer online nei oo tui kore fel na tui kor na...socket diye hi..really yaa.. 
                    //sho
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });
// 