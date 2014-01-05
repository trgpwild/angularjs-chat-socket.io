var fs = require('fs');
var path = require('path');

(function() {

    function WebsocketCtrlLoader(io) {
        var folderpath = __dirname + "/websocket_controllers/";
        this.loadControllers(folderpath, io);
    }
    
    WebsocketCtrlLoader.prototype.loadControllers = function (folderpath, io) {
        fs.readdir(folderpath, function(err, files) {
            if (err) {
                throw err;
            }
            files.forEach(function(websocketControllerFile) {
                if (path.extname(websocketControllerFile) === '.js') {
                    require(folderpath + websocketControllerFile)(io);
                }
            });
        });
    };

    module.exports = WebsocketCtrlLoader;

})();