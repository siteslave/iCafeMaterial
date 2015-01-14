App.factory('SettingsService', function ($q, Common) {
        var config = Common.getConfig();
        var configFile = Common.getConfigFile();

        return {
            getConfig: function () {
                return config.db;
            },

            saveConfig: function (configData) {
                var q = $q.defer();

                var data = {
                    db: configData
                };

                jf.writeFile(configFile, data, function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

                return q.promise;
            }
        };

    });
