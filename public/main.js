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

        $http.post('/signup',data).then(function(response){ //ajax request from frontend to backend
            console.log(response);
            window.location='/'; // cool..validation and all pore kore nish ok 

        },function(error){
            
            console.log(error);

        });

    };
});
app.controller("FriendController",function ($scope)
{
    /*
    so ekhane u want to display a list right? yo
    users er list ta kotha theke aashbe? db theke
    db k ke use kore? user ra -__-  server
    so..aage toke serber/backend k request korte hobe..ki users er list ta deben hrieghth?Ehhhee yo r8
    so aage backend e ekta route banate hobe jeta ekhane request korbi right? yo backend e ekta route bana name it something like /fetch/users opo ?  ki ?backend e rout
    */
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
        newMsg.rname = $scope.receiver_name;

         if($scope.m)
         {
        	$scope.socket.emit('socket_key',newMsg); 
            $scope.m = '';
            return false;
        }
    };                


    $scope.socket.on('socket_key', function(msg){
    	$scope.chatList.push(msg);
        $scope.$apply();
    });


});
app.controller("TemplateController",function ($scope,$rootScope)
{
    $scope.my_name=""; 
     $scope.my_pass=""; 
    // acha eta bol..signup page ta kon page theke khola uchit?homepage ei signyp ba login er option thaka uch
    $scope.next=function(){
        localStorage.setItem('key1',$scope.my_name);
        localStorage.setItem('key2',$scope.my_pass);
        // jaa ebar redirect kora
        window.location='/#!/friend'; 
    };
 });
