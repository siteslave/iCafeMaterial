App.factory('ReportsService', function ($q, Common) {
    var db = Common.getConnection();

    return {
        getTotal: function (start, end) {
            var q = $q.defer();

            /*
            select *, timediff(end_time, start_time) as remain
            from activity_log
            where service_date between '2015-01-01' and '2015-01-31'
            order by service_date
            */
            db('activity_log as a')
                .select('a.*', db.raw('TIMEDIFF(a.end_time, a.start_time) as remain'), 'c.name')
                .innerJoin('computers as c', 'c.id', 'a.computer_id')
                .whereBetween('a.service_date', [start, end])
                .exec(function (err, rows) {
                    if (err) q.reject (err);
                    else q.resolve(rows);
                });

            return q.promise;
        }
    };

});
