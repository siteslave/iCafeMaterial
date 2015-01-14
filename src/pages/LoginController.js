App.controller('LoginController', function ($scope, LoginService, LxNotificationService) {

    $scope.error = false;

    $scope.doLogin = function () {
        LoginService.doLogin($scope.username, $scope.password)
            .then(function (total) {
                if (total) {
                    location.href = 'Index.html';
                } else {
                    LxNotificationService.alert('เกิดข้อผิดพลาด', 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบ', 'ตกลง', function (ans) {
                        if (ans) {
                            //console.log(ans);
                        }
                    });
                }
            }, function (err) {
                console.log(err);
            });
    };
});
