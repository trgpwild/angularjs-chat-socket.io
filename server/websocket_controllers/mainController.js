module.exports = function mainController(io) {

    var users = [];
    var messages = [];

    io.on('connection', function(socket) {

        messages.forEach(function(data) {
            socket.emit('chat:message', data);
        });

        socket.on('disconnect', function() {
            if (users[socket.id]) {
                broadcast('chat:message', {
                    name: '[Chat_Management]',
                    text: users[socket.id] + ' was disconected'
                });
            }
        });

        socket.on('chat:message', function(msg) {
            broadcast('chat:message', msg);
            users[socket.id] = msg.name;
            messages.push(msg);
        });

        function broadcast(event, data) {
            io.sockets.emit(event, data);
        }

    });

};