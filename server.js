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

app.get('/chevron.png', function(req, res) {
    res.sendFile(__dirname + '/chevron.png');
});
//  Initializaton   ///////////////////////////////

var online = 0;
var RedClicks = 0;
var BlueClicks = 0;



//The most interesting part of this file!
io.on('connection', function(socket) {
    console.log('User connected');
    online++;

    socket.emit('online', online);

    //Disconnect event
    socket.on('disconnect', function() {
        console.log('User disconnected');
        online--;

        socket.emit('online', online);
    });


    //Red button click event
    socket.on('red clicked', function(callback) {
        RedClicks++;
        console.log('Red button clicks number is ' + RedClicks);

        //As true, I don't know, why does it works.
        socket.broadcast.emit('red clicked');
    });


    //Blue button click event
    socket.on('blue clicked', function() {
        BlueClicks++;
        console.log('Blue button clicks number is ' + BlueClicks);

        //As true, I don't know, why does it works.
        socket.broadcast.emit('blue clicked');
    });


    //Sending variables to client
    socket.on('request', function(callback) {
        callback(RedClicks, BlueClicks, online);
        console.log('Sending variables...');
    });
});



//Only listener. Nothing more...
http.listen(3030, function() {
    console.log('listening!');
});
