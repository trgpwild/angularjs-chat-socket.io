'use strict';

angular.module('angularjsChatWebsocketApp').controller('MainCtrl', function($scope) {

    var chat = io.connect();

    $scope.messages = [];
    $scope.warning = '';
    
    $scope.reset = function() {
        $scope.nameTextboxDisabled = false;
        $scope.msg = {
            name: '',
            text: ''
        };
    };
    
    $scope.reset();

    chat.on('connect', function() {
        console.log('client connected...');
    });

    chat.on('chat:warning', function(warning) {
        $scope.reset();
        $scope.warning = warning;
        $scope.$apply();
    });

    chat.on('chat:message', function(msg) {
        $scope.messages.push(msg);
        $scope.$apply();
    });

    $scope.send = function send() {
        if ($scope.msg.name !== '' && $scope.msg.name.length > 0) {
            console.log('Sending message:', $scope.text);
            chat.emit('chat:message', $scope.msg);
            $scope.nameTextboxDisabled = true;
            $scope.msg.text = '';
        }
    };

});