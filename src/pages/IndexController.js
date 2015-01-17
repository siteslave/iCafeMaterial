App.controller('IndexController', function ($scope, IndexService, Common, $timeout, LxDialogService, LxNotificationService) {

    $scope.computers = [];
    $scope.serviceType = true;


    var bathPerHour = Common.getPayPerHour(); // 15

    //bath per minute
    var bathPerMinute = 15/60;
    var minutePerBath = 60/15;

    $scope.getComputerList = function () {
        // clear all computers list
        $scope.computers = [];

        IndexService.getComputerList()
            .then(function (rows) {
                var totalEnd = 0;
                _.forEach(rows, function (v) {
                    var obj = {};
                    obj.id = v.id;
                    obj.name = v.name;
                    obj.start_time = v.start_time;
                    obj.end_time = v.end_time;
                    obj.service_type = v.service_type;
                    obj.remain = v.remain;
                    obj.is_pay = v.is_pay;

                    if ($scope.checkGt(v.remain) && v.service_type=='Y') {
                        totalEnd++;
                    }

                    $scope.computers.push(obj);
                });

                win.setBadgeLabel(totalEnd);

            }, function (err) {
                console.log(err);
            });
    };

    $scope.countdown = function () {
        $timeout(function () {
            $scope.getComputerList();
            $scope.countdown();
        }, 60000);
    };

    $scope.isOnline = function (computerId) {

        IndexService.checkComputerIsOnline(computerId)
            .then(function (isOnline) {
                return isOnline;
            }, function (err) {
                console.log(err);
            });

    };

    // Start countdown
    $scope.countdown();
    // Get computer list
    $scope.getComputerList();

    // Show action
    $scope.showAction = function (computerId) {
        $scope.playerName = 'GUEST';
        $scope.computerId = computerId;
        LxDialogService.open('mdlAction');

    };

    $scope.getRemain = function (start, end, money) {
        var h = moment.utc(moment().diff(moment(rows.start_time, "YYYY-MM-DD HH:mm:ss"))).format("H");
        var m = moment.utc(moment().diff(moment(rows.start_time, "YYYY-MM-DD HH:mm:ss"))).format("m");

        var totalBath = (h * 15) + Math.round(m * (15/60));

        if (totalBath > money) {
            return 'หมดเวลา';
        } else {
            return moment.utc(moment(end, "YYYY-MM-DD HH:mm:ss").diff(moment())).format("HH:mm");
        }
    };
    // Save activity
    $scope.saveActivity = function () {

        //LxNotificationService.info('Save success');
        var data = {};
        // - playerName
        data.playerName = $scope.playerName;
        // - serviceType: true = limit time, false = unlimit time
        data.serviceType = $scope.serviceType ? 'Y' : 'N';
        // - money

        if (data.serviceType == 'N') {
            data.isPay = 'N';
            data.money = 0;
        } else {
            data.money = $scope.money ? !isNaN($scope.money) ? $scope.money : 0 : 0;
            // - isPay
            data.isPay = $scope.isPay ? 'Y' : 'N';
        }

        
        // - computerId
        data.computerId = $scope.computerId;
        // - Start date time
        data.startTime = moment().format('YYYY-MM-DD HH:mm:ss');

        data.serviceDate = moment().format('YYYY-MM-DD');
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        // - End date time
        if ($scope.serviceType) {
            var allMinute = Math.round((data.money * 60) / bathPerHour);

            data.endTime = moment().add(allMinute, 'm').format('YYYY-MM-DD HH:mm:ss');
        } else {
            data.endTime = '0000-00-00 00:00:00';
        }

        if ($scope.serviceType && isNaN($scope.money)) {
            LxNotificationService.error('กรุณาระบุจำนวนเงินเป็นตัวเลข');
        } else if(!$scope.playerName) {
            LxNotificationService.error('กรุณาระบุชื่อผู้เล่น');
        } else {
            // check computer is ready
            IndexService.checkComputerIsOnline($scope.computerId)
                .then(function (isOnline) {
                    if (!isOnline) {
                        IndexService.saveActivity(data)
                            .then(function () {
                                LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                                LxDialogService.close('mdlAction');
                                $scope.getComputerList();
                            }, function (err) {
                                console.log(err);
                                LxNotificationService.error('เกิดข้อผิดพลาดในการบันทึก กรุณาตรวจสอบ log');
                            });

                    } else {
                        LxNotificationService.error('เครื่องยังไม่ว่างไม่สามารถจับเวลาได้');
                    }
                }, function (err) {
                    LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดูที่ log');
                    console.log(err);
                });

        }

    };

    // Finished
    $scope.showMoney = function (computerId, computerName) {

        // Get service detail
        $scope.totalMoney = 0;
        $scope.totalTrueMoney = 0;

        IndexService.getTotalService(computerId)
            .then(function (rows) {

                $scope.computerId = computerId;
                $scope.computerName = computerName;
                $scope.totalTime = moment(rows.total_time, 'HH:mm:ss').format('HH:mm');

                var h = moment.utc(moment().diff(moment(rows.start_time, "YYYY-MM-DD HH:mm:ss"))).format("H");
                var m = moment.utc(moment().diff(moment(rows.start_time, "YYYY-MM-DD HH:mm:ss"))).format("m");


                if (rows.money) {

                    $scope.totalTrueMoney = (h * 15) + Math.round(m * (15/60));
                    $scope.totalMoney = rows.money;

                } else {
                    $scope.totalMoney = (h * 15) + Math.round(m * (15/60));
                    $scope.totalTrueMoney = $scope.totalMoney;
                }

                LxDialogService.open('mdlMoney');

            }, function (err) {
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดูที่ log');
                console.log(err);
            });


    };

    $scope.doSaveMoney = function () {
        //saveActivityLog

        IndexService.getServiceDetail($scope.computerId)
            .then(function (row) {
                var data = {};

                data.computer_id = row.id;
                data.service_date = row.service_date;
                data.start_time = row.start_time;
                data.end_time = moment().format('YYYY-MM-DD HH:mm:ss');
                data.service_type = row.service_type;
                data.player_name = row.player_name;
                data.created_datetime = row.created_datetime;
                data.money = row.money;
                data.is_pay = row.is_pay;
                data.true_money = $scope.totalTrueMoney;

                return IndexService.saveActivityLog(data);
            })
            .then(function () {
                return IndexService.removeActivity($scope.computerId);
            })
            .then(function () {
                LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                LxDialogService.close('mdlMoney');
                $scope.getComputerList();
            }, function (err) {
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดูที่ log');
                console.log(err);
            });

    };

    $scope.doUpdateTime = function () {

        if (!$scope.newTime) {
            LxNotificationService.error('กรุณาระบุเวลา');
        } else {
            var newDateTime = moment($scope.newTime);
            var hour = newDateTime.get('hour');
            var minute = newDateTime.get('minute');

            var newTimeToAdd = hour + ':' + minute + ':00';

            IndexService.addTime($scope.computerId, newTimeToAdd)
                .then(function () {
                    LxNotificationService.success('เพิ่มเวลาเสร็จเรียบร้อยแล้ว');
                    $scope.getComputerList();
                    LxDialogService.close('mdlAddTime');
                }, function (err) {
                    LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดูที่ log');
                    console.log(err);
                });
        }


    };

    // Add time
    $scope.addTime = function (computerId, computerName) {
        $scope.newTime = null;
        $scope.computerId = computerId;
        $scope.computerName = computerName;
        LxDialogService.open('mdlAddTime');
    };

    $scope.showChangeComputer = function (computerId, computerName) {
        $scope.oldComputerId = computerId;
        $scope.computerName = computerName;

        IndexService.getOfflineComputer()
            .then(function (rows) {
                $scope.computersOffline = rows;
                LxDialogService.open('mdlChangeComputer');
            }, function (err) {
                console.log(err);
            });
    };

    $scope.doChangeComputer = function () {

        //$scope.oldComputerId
        //$scope.computerId

        if (!$scope.computerId) {
            LxNotificationService.error('กรุณาระบุเครื่องปลายทางที่ต้องการย้าย');
        } else {
            IndexService.changeComputer($scope.oldComputerId, $scope.computerId)
                .then(function () {
                    LxNotificationService.success('เปลี่ยนเครื่องเสร็จเรียบร้อย');
                    $scope.getComputerList();
                    LxDialogService.close('mdlChangeComputer');
                }, function (err) {
                    console.log(err);
                    LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดูที่ log');
                });
        }
    };

    $scope.setComputerId = function (id) {
        $scope.computerId = id;
    };

    $scope.closeChangeComputer = function () {
        $scope.oldComputerId = null;
        $scope.computerId = null;
    };

    $scope.closeAddTime = function () {
        $scope.computerId = null;
        $scope.computerName = null;
        $scope.newTime = null;
    };

    $scope.closeMoney = function () {
        $scope.computerId = null;
        $scope.computerName = null;
        $scope.totalMoney = 0;
        $scope.totalTrueMoney = 0;
        $scope.totalTime = '00:00';
    };

    $scope.closeAction = function () {
        $scope.playerName = null;
        $scope.serviceType = true;
        $scope.computerId = null;
        $scope.money = 0;
        $scope.isPay = false;
    };

    $scope.checkGt = function (t) {
        if (t) {
            var a = t.split(':');
            if (a[0].charAt(0) == '-' || (a[0] == '00' && a[1] == '00')) {
                return true;
            } else {
                return false;
            }
        }
    };

    $scope.confirmCancel = function (computerId) {
        LxNotificationService.confirm('ยืนยันการยกเลิก', 'คุณต้องการยกเลิกการใช้บริการในครั้งนี้ใช่หรือไม่?', {
            cancel: 'ยกเลิก', ok: 'ใช่, ฉันต้องการยกเลิก'
        }, function (ans) {
            if (ans) {
                IndexService.removeService(computerId)
                    .then(function () {
                        LxNotificationService.success('ยกเลิกรายการเสร็จเรียบร้อยแล้ว');
                        $scope.getComputerList();
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        });
    };


    // check current status
    $scope.checkCurrentStatus = function(data) {
        /*
        0 = Empty
        1 = Not finished
        2 = Finished                   
        */
        if (data.service_type == 'Y') {
            if ($scope.checkGt(data.remain)) {
                return 2; // Finished
            } else {
                return 1;
            }
        } else if (data.service_type == 'N') {
            return 1;
        } else {
            return 0;
        }
    };

});
