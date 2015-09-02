// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});
// tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// });

var server = app.listen(8002, function() {
	console.log("socket listening on port 8002")
});

var io = require('socket.io').listen(server)
var total = 0;

io.sockets.on('connection', function (socket) {
	console.log("We are using sockets!!");
	console.log(socket.id);

	    io.emit('total_count', {
	    	total:  total
	    });

	socket.on("click_counts", function (data){
	    console.log('Someone clicked a button! Click count: ' + data.click);
	    total = total + data.click;
	    io.emit('total_count', {
	    	total:  total
	    });
	})

	socket.on("nuke_counts", function (data){
	    console.log('Someone nuked the button count!!!');
	    total = 0;
	    io.emit('total_count', {
	    	total:  total,
	    	message: 'Someone nuked the click count, NOOOO!!'
	    });
	})
})
