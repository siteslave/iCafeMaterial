App.filter('toShortTime', function () {
    return function (t) {
        if (!t || !moment(t).isValid()) {
            return '-:-';
        } else {
            return moment(t).format('HH:mm');
        }
    };
});

App.filter('toShortTime2', function () {
    return function (t) {
        if (!t) {
            return '-:-';
        } else {
            var a = t.split(':');

            return a[0] + ':' + a[1];

        }
    };
});

App.filter('toShortDate', function () {
    return function (d) {
        if (!d) {
            return '';
        } else {
            var newDate = moment(d, 'YYYY-MM-DD').format('DD/MM/YYYY');

            return newDate;
        }
    };
});

App.filter('getRemain', function () {
    return function (end) {
        return moment.utc(moment(end, "YYYY-MM-DD HH:mm:ss").diff(moment()))
            .format("HH:mm");

    };
});

App.filter('getCurrent', function () {

    return function (start) {
        if (!start || !moment(start).isValid()) {
            return '-:-';
        } else {
            return moment.utc(moment().diff(moment(start, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm");
        }

    };
});

App.filter('getMoney', function () {

    return function (start) {
        if (start) {
            var h = moment.utc(moment().diff(moment(start, "YYYY-MM-DD HH:mm:ss"))).format("H");
            var m = moment.utc(moment().diff(moment(start, "YYYY-MM-DD HH:mm:ss"))).format("m");

            var totalBath = (h * 15) + Math.round(m * (15/60));

            return Math.round(totalBath);
        } else {
            return 0;
        }

    };
});

App.filter('isGt', function () {

    return function (end) {
        return moment().isAfter(moment(end, 'YYYY-MM-DD HH:mm:ss'));
    };
});


//var bathPerMinute = 15/60;
//var minutePerBath = 60/15;
