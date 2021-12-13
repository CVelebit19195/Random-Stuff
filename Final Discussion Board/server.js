// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var qs = require('querystring');
// static content 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var server = app.listen(2000);

var users = [];
var convos = [];
// this gets the socket.io module *new code!* 
var io = require('socket.io').listen(server)  // notice we pass the server object<br>
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
	console.log("WE ARE USING SOCKETS!");
	console.log(socket.id);
	//all the socket code goes in here!
	socket.on("new_user", function (data) {
		users.push(data.res);
		var current = users.length - 1;
		console.log(current);
		socket.emit('user', { res: convos, user: current })
	})
	socket.on("message", function (data) {
		var message = qs.parse(data.res);
		console.log(message.numberAttached);
		var p = message.numberAttached + ":" + users[message.user] + ": " + message.message
		console.log("Message Recieved: " + p);
		convos.push(p);
		io.emit('convos', { res: convos });
	})
})

app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function (req, res) {
	res.render("index");
})