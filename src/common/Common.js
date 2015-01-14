var jf = require('jsonfile'),
    path = require('path'),
    gui = require('nw.gui');

var configPath = gui.App.dataPath,
    configFile = path.join(configPath, 'config.json');

var config = jf.readFileSync(configFile);

App.factory('Common', function () {

        return {
            getConfigFile: function () {
                return configFile;
            },
            getConfig: function () {
                return config;
            },

            getConnection: function () {

                return require('knex')({
                    client: 'mysql',
                    connection: config.db
                });
            },

            getPayPerHour: function () {
                return 15;
            }
        };

    });
