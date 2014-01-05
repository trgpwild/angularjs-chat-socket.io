'use strict';

angular.module('angularjsChatWebsocketApp').controller('MainCtrl', function($scope) {

    $scope.nameTextboxDisabled = false;

    var chat = io.connect();

    $scope.messages = [];
    $scope.warning = '';
    
    $scope.msg = {
        name: '',
        text: ''
    };

    chat.on('connect', function() {
        console.log('client connected...');
    });

    chat.on('chat:warning', function(warning) {
        $scope.warning = warning;
        $scope.$apply();
    });

    chat.on('chat:message', function(msg) {
        $scope.messages.push(msg);
        $scope.$apply();
    });

    $scope.send = function send() {
        console.log('Sending message:', $scope.text);
        chat.emit('chat:message', $scope.msg);
        $scope.nameTextboxDisabled = true;
        $scope.msg.text = '';
    };

});