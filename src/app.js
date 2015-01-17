var jf = require('jsonfile'),
    fs = require('fs'),
    path = require('path'),
    gui = require('nw.gui'),
    moment = require('moment'),
    _ = require('lodash'),
    win = gui.Window.get();

jf.spaces = 2;

var appPath = gui.App.dataPath,
    configFile = path.join(appPath, 'config.json');

var isExist = fs.existsSync(configFile);

if (!isExist) {
    var defaultConfig = {
        db: {
            host: '127.0.0.1',
            port: 3306,
            database: 'icafe',
            user: 'root',
            password: '789124'
        }
    };

    jf.writeFileSync(configFile, defaultConfig);
}

App = angular.module('App', ['lumx']);

App.controller('MainController', function($scope) {
    $scope.showDebugTools = function() {
        win.showDevTools();
    };
});