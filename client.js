var RedClicks = 0;
var BlueClicks = 0;
var online = 0;
var scrolled = false;


$(document).ready(function() {

    //Initialization
    var socket = io();

    //Request for variables
    socket.emit('request', function(red, blue, onl) {
        RedClicks = parseInt(red);
        BlueClicks = parseInt(blue);
        online = parseInt(onl);

        document.getElementById('RedClicks').innerHTML =
            'Clicked:<br>' + RedClicks + ' times';
        document.getElementById('BlueClicks').innerHTML =
                'Clicked:<br>' + BlueClicks + ' times';
    });


    //Red button's clicks' handler
    $('#RedButton').click(function() {

        socket.emit('red clicked');
        increaseRedClicks();
    });


    //Blue button's clicks' handler
    $('#BlueButton').click(function() {

        socket.emit('blue clicked');
        increaseBlueClicks();
    });


    //Red button click event handler
    socket.on('red clicked', function() {
        increaseRedClicks();
    });


    //Blue button click event
    socket.on('blue clicked', function() {
        increaseBlueClicks();
    });


    /*$('body').scroll(function() {
        if(!scrolled) {
            //TODO
        }
    });*/
});






function increaseRedClicks() {
    RedClicks++;

    //Render
    document.getElementById('RedClicks').innerHTML =
            'Clicked:<br>' + RedClicks + ' times';
}


function increaseBlueClicks() {
    BlueClicks++;

    //Render
    document.getElementById('BlueClicks').innerHTML =
            'Clicked:<br>' + BlueClicks + ' times';
}


/*   TODO:  переменные принимаются клиентом при загрузке
    слишком долго, так что программа записывает исходные звачения кликов
    надо сделать так, чтобы она писала принимаемые значения   */