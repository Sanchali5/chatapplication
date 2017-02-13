var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider, $locationProvider)
{
    // lemme check the syntaxsure
   $routeProvider
        .when("/",{
            templateUrl:"template.html", //after every attribute..?
            controller:"TemplateController"
        })
      
        .when("/chatroom",{
            templateUrl:"/chat.html",
            controller:"ChatController"
      
        });
 // this tells angular to not to use #!
});


app.controller("ChatController",function ($scope)
{
	$scope.chatList = [];

	$scope.m = '';// it is used to store the message the client writes? yeaa...2 way bindin hoye gelo html er saathe...whatever is inside scope...its available in html too..make this clear in ur mind
	$scope.socket = io(); 
    $scope.my_name =localStorage.getItem('key1'); 

    $scope.sendChatMessage = function(){//defining the send function yeaa
        // abbe!! XD XD XD
        // ota bas show korche na..but ei list e jaache...if u console this chatList..ota thakbe...ekhane ekta if statment er modhe kor..
        // if there is some text in the $scope.m then run the below code i hate to work in this page worlolololllo
        // aami ki bolbo bol eta te kichu na ok kora rc tc chaar taale kano kobo ami to emni bollam ok..kalke korish...aajke pls shue ja shue ja hoyna shue por hoy ok i will but ekhn na ghum pachena..taale lappy chalashna..emni shue thak ..rest neoukay thanks and sorRy i slept..hm koi ni
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
    
    $scope.next=function(){
        localStorage.setItem('key1',$scope.my_name);
        // jaa ebar redirect kora
        window.location='/#!/chatroom'; 
    };
 });