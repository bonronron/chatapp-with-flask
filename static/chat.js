var username=""
var sentmsg = '<article class="msg-container msg-self" id="msg-0"><div class="msg-box"><img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" /><div class="flr"><div class="messages"><p class="msg" id="msg-0">{message}</p></div><span class="timestamp"><span class="username">{username}</span>&bull;</span></div></div></article>'
var recievedmsg = '<article class="msg-container msg-remote" id="msg-0"><div class="msg-box"><img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" /><div class="flr"><div class="messages"><p class="msg" id="msg-0">{message}</p></div><span class="timestamp"><span class="username">{username}</span>&bull;</span></div></div></article>'
$(document).ready(function(){
    //Initialize Socket
    const socket = io();
    //Get username from server sessions
    socket.on('connect', function() {
        socket.emit('connectnew', {data: 'I\'m connected!'});
        socket.on('connectnew',data => { if (username == ""){ username = data} })
    });
    //Socket to get messages from other people
    socket.on('chatrec', data => {
        console.log(data);
        if(data.username!=username){ //Check first if message is by self
            $(".chat-window").append(recievedmsg.replace("{message}",data.msg).replace("{username}",data.username));//print recieved message on screen
        }
        
    });

    //Event to handle user sending messages
    $("#send").click(function(){

        if ($('.chat-input input').val() != ''){ // check if user tried to send blank message    
            //console.log($('.chat-input input').val());
            $(".chat-window").append(sentmsg.replace("{message}",$('.chat-input input').val()).replace("{username}",username));//print message as self message
            socket.emit('sendchat', {data: $('.chat-input input').val()});//emit message to server
            $('.chat-input input').val("");//replace input to blank
        }
    });
    
});

//CSS CODE
$('.chat-input input').keyup(function(e) {
    if ($(this).val() == '')
        $(this).removeAttr('good');
    else
        $(this).attr('good', '');
});



