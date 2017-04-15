var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

app.get('/client.js', function(req, res){
    res.sendFile(__dirname + '/client.js');
});

app.get('/MechanicalBd.otf', function(req, res){
    res.sendFile(__dirname + '/MechanicalBd.otf');
});
//  Initializaton   ///////////////////////////////

var online = 0;
var RedClicks = 0;
var BlueClicks = 0;



//The most interesting part of this file!
io.on('connection', function(socket) {
    console.log('User connected');

    //Disconnect event
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});



//Only listener. Nothing more...
http.listen(3030, function() {
    console.log('listening!');
});