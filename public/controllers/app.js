var app = angular.module('flapperNews', []);  
//crates a module named 'flapperNews' with empty array

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

$scope.contactlist = [];


//hello defines the route to the server
//then defines "if success"

var refresh = function(){

$http.get('hello').then(function(response){
	console.log("app.js recieved the data");
  	$scope.contactlist = response.data;
	$scope.contact = null; //clear input boxes after refresh function

//updates contact list with the data received from the server

});

};


refresh();

  $scope.addContact = function(){
	console.log($scope.contact);
	$http.post('/hello',$scope.contact).then(function(response){
		console.log(response);
		refresh();
});

};

$scope.remove = function(id){
	console.log(id); //reference for mongodb
	$http.delete('/hello/' + id).then(function(response){
	refresh();

});	//delete from webpage

//"then" is used to immediately refresh the browser page after the remove button is clicked
};


$scope.edit = function(id){
	console.log(id);
	$http.get('/hello/' + id).then(function(response){
	$scope.contact = response.data;
	
	
});
};


$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/hello/' + $scope.contact._id, $scope.contact).then(function(response){	refresh();

});

};

$scope.deselect = function(){
	$scope.contact = "";

};

  $scope.test = 'Hello world!';
  $scope.yooyzz = [{t: 'a', u: 1},

// ".OO" basically defines a new object and attaches it to $scope

{t: 'b', u: 2}, 
{t: 'c', u: 3}, 
{t: 'd', u: 4}, 
{t: 'e', u: 5}];

console.log("こんにちは from app.js");

}]



);
