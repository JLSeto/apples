var express = require('express');
var app = express();
var mongojs = require('mongojs');

//Use created contactlist from database
var db = mongojs('contactlist', ['contactlist']); 
var bodyParser = require('body-parser');



//Uses the module express to serve static files in public folder
//Use Body Parser. (google more about this)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 

//Uses the route hello. When a page is refreshed, a get request is sent to server
// Search database and serves that information the controller
app.get('/hello', function(req, res){
	console.log("I received a GET request");  
	
	db.contactlist.find(function(err, docs) {
		console.log(docs);  //sends docs to the console log
		res.json(docs);


});

});

app.put('/hello/:id', function(req, res){
	var id = req.params.id; //get the value of id from url
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, new: true}, function(err, doc){
		res.json(doc);


});

});




app.get('/hello/:id', function(req, res){
	var id = req.params.id; //get the value of id from url
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){	res.json(doc);  //send back item we are looking for back to controller

});
});




app.delete('/hello/:id', function(req, res){
	var id = req.params.id; //get the value of id from url
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){	res.json(doc);  //send back item we are removing back to controller

});
});

//Pulls information from controller and inserts into databse.
//res.json converts the response and p
app.post('/hello', function(req, res){
	console.log(req.body);
	
	db.contactlist.insert(req.body, function(err, doc){		
		res.json(doc);

});

});

app.set('port', 3000)
app.listen(process.env.PORT || 3000);
console.log("Server is running on: " + app.get('port'));
