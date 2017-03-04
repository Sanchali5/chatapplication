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
 
});
app.controller("SignupController",function ($scope, $http)
{
    
    $scope.signup = function(){
        var data = {
             username: $scope.username,
             pass: $scope.pass            
        };

        $http.post('/signup',data).then(function (response){ 
            console.log(response);
            window.location='/'; 

        },function (error){
            
            console.log(error);

        });

    };
});
app.controller("FriendController",function ($scope,$http)
{
    
         $http.get('/fetch/users?myid='+localStorage.getItem('key2')).then(function (response) {
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
app.controller("ChatController",function ($scope,$http)
{
	$scope.chatList = [];
    
	$scope.m = '';
	$scope.socket = io(); 
  $scope.my_name =localStorage.getItem('key1'); 
  var prechat = {
      rid: localStorage.getItem('friend_id'),
      sid: localStorage.getItem('key2')

  };
  
  
  $http.get('/prefill/chat?rid='+prechat.rid+'&sid='+prechat.sid).then(function (response) {
      console.log(response.data); 
     
      $scope.chatList= response.data;
  });

  $scope.sendChatMessage = function(){
        
        var newMsg = new Object();
        newMsg.username = $scope.my_name;
        newMsg.msg = $scope.m;
        newMsg.sid =  localStorage.getItem('key2');
        newMsg.rid =  localStorage.getItem('friend_id');

         if($scope.m)
         {
        	$scope.socket.emit('socket_key', newMsg);  
            $scope.m = '';
            return false; 
        }
  };                    


  $scope.socket.on(localStorage.getItem('key2'),function(msg){  
     $scope.chatList.push(msg);
     $scope.$apply();
  });


});
app.controller("TemplateController",function ($scope,$rootScope,$http)
{
    $scope.my_name=""; 
     $scope.my_pass=""; 
     $scope.login=function(){
        var data = {
             username: $scope.my_name,
             pass: $scope.my_pass           
        };
        $http.post('/auth/login',data).then(function (response) {

                console.log(response.data);

                if(response.data.length>0) 
                {
                    localStorage.setItem('key1',response.data[0].username);
                    localStorage.setItem('key2',response.data[0].id);
                    window.location = '/#!/friend';
                    
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });
// 