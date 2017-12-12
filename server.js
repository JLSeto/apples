var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);


app.use(express.static(__dirname + '/public'));

app.get('/contactlist', function(req, res){
	console.log("I received a GET request");


person1 ={
	name: "Tim",
	email: "lol@gmail.com",
	number: "1111"

};

person2 ={
	name: "Tim",
	email: "lol@gmail.com",
	number: "2222"

};

person3 ={
	name: "Tim",
	email: "lol@gmail.com",
	number: "3333"

};

var contactlist = [person1, person2, person3];
res.json(contactlist);

});

app.set('port', 3000)
app.listen(process.env.PORT || 3000);
console.log("Server is running on: " + app.get('port'));
