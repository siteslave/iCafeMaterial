App.controller('ReportsController', function ($scope, ReportsService, LxNotificationService) {

    $scope.transactions = [];

    $scope.getTotal = function () {

        $scope.transactions = [];
        $scope.totalMoney = 0;
        $scope.totalTrueMoney = 0;

        if ($scope.startDate && $scope.endDate) {
            var startDate = moment($scope.startDate).format('YYYY-MM-DD');
            var endDate = moment($scope.endDate).format('YYYY-MM-DD');

            ReportsService.getTotal(startDate, endDate)
                .then(function (rows) {
                    var totalMoney = 0;
                    var totalTrueMoney = 0;

                    _.forEach(rows, function (v) {
                        var obj = {};
                        obj.name = v.name;
                        obj.service_date = moment(v.service_date).format('DD/MM/YYYY');
                        obj.service_type = v.service_type == 'Y' ? 'จับเวลา' : 'เรื่อยๆ';
                        obj.start_time = v.start_time;
                        obj.end_time = v.end_time;
                        obj.player_name = v.player_name;
                        obj.remain = moment(v.remain, 'HH:mm:ss').format('HH:mm');
                        obj.money = v.money;
                        obj.true_money = v.true_money;

                        totalMoney += v.money;
                        totalTrueMoney += v.true_money;
                        $scope.transactions.push(obj);
                    });

                    $scope.totalMoney = totalMoney;
                    $scope.totalTrueMoney = totalTrueMoney;

                }, function (err) {
                    console.log(err);
                });
        } else {
            LxNotificationService.error('กรุณาระบุช่วงเวลาที่ต้องการ');
        }

    };

});
