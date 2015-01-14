App.controller('SettingsController', function ($scope, SettingsService, LxNotificationService) {

        $scope.config = SettingsService.getConfig();

        $scope.saveConfig = function () {

            SettingsService.saveConfig($scope.config)
                .then(function () {
                    LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                }, function (err) {
                    LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log.');
                    console.log(err);
                });
        };

    });
