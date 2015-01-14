App.controller('SettingsController', function ($scope, SettingsService, LxNotificationService) {

        $scope.config = SettingsService.getConfig();

        $scope.saveConfig = function () {

            SettingsService.saveConfig($scope.config)
                .then(function () {
                    LxNotificationService.success('Save success');
                }, function (err) {
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู log');
                    console.log(err);
                });
        };

    });
