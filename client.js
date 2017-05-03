var RedClicks = 0;
var BlueClicks = 0;
var online = 0;
var scrolled = false;
var arrow = false;


$(document).ready(function() {

    //Initialization
    var socket = io();

    //Request for variables
    socket.emit('request', function(red, blue, onl) {
        RedClicks = parseInt(red);
        BlueClicks = parseInt(blue);
        online = parseInt(onl);

        document.getElementById('RedClicks').innerHTML =
                renderNum(RedClicks);
        document.getElementById('BlueClicks').innerHTML =
                renderNum(BlueClicks);
        document.getElementById('online').innerHTML =
                'Online: ' + (online - 1);
    });


    //Red button clicks handler
    $('#RedButton').click(function() {

        socket.emit('red clicked');
        increaseRedClicks();

        if(scrolled == false && arrow == false) {
            document.getElementById('arrow_div').innerHTML =
                '<img src="/chevron.png" id="arrow">';
                arrow = true;
        }
    });


    //Blue button clicks handler
    $('#BlueButton').click(function() {

        socket.emit('blue clicked');
        increaseBlueClicks();

        if(scrolled == false && arrow == false) {
            document.getElementById('arrow_div').innerHTML =
                '<img src="/chevron.png" id="arrow">';
                arrow = true;
        }
    });


    //Red button click event handler
    socket.on('red clicked', function() {
        increaseRedClicks();
    });


    //Blue button click event handle
    socket.on('blue clicked', function() {
        increaseBlueClicks();
    });


    socket.on('online', function(onl) {
        online = onl;
        document.getElementById('online').innerHTML =
                'Online: ' + (online - 1);
    });


    $(window).scroll(function() {
        if(arrow) {
            document.getElementById('arrow').outerHTML = '';
            arrow = false;
            scroll = true;
        }
    });
});






function increaseRedClicks() {
    RedClicks++;

    //Render
    document.getElementById('RedClicks').innerHTML =
            renderNum(RedClicks);
}


function increaseBlueClicks() {
    BlueClicks++;

    //Render
    document.getElementById('BlueClicks').innerHTML =
            renderNum(BlueClicks);
}


function renderNum(num) {
    var result = "Clicked:<br>";
    if(num >= Math.pow(10, 12)) {
        var trill = num - num % Math.pow(10, 12);
        result += (trill / Math.pow(10, 12)) + " trillions<br>";
    }
    if(num > Math.pow(10, 6))
        result += ((num - trill - (num % Math.pow(10, 6))) / Math.pow(10, 6)) + " millions<br>";
    result += num % Math.pow(10, 6) + " times";
    return result;
}