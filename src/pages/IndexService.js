App.factory('IndexService', function ($q, Common) {

    var db = Common.getConnection();

    return {

        getOfflineComputer: function () {
            var q = $q.defer();

            var subQuery = db('activity').distinct('computer_id').select();

            db('computers')
                .whereNotIn('id', subQuery)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        getComputerList: function () {
            var q = $q.defer();

            db('computers as c')
                .select('c.id', 'c.name', 'a.*', db.raw('TIMEDIFF(TIME(a.end_time), CURRENT_TIME()) as remain'))
                .leftJoin('activity as a', 'a.computer_id', 'c.id')
                .orderBy('c.name', 'asc')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        checkComputerIsOnline: function (computerId) {
            var q = $q.defer();

            db('activity')
                .where('computer_id', computerId)
                .count('* as total')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else {
                        var isOnline = rows[0].total > 0 ? true : false ;
                        q.resolve(isOnline);
                    }
                });

            return q.promise;
        },

        saveActivity: function (data) {
            var q = $q.defer();

            db('activity')
                .insert({
                    service_date: data.serviceDate,
                    computer_id: data.computerId,
                    start_time: data.startTime,
                    end_time: data.endTime,
                    service_type: data.serviceType,
                    player_name: data.playerName,
                    money: data.money,
                    is_pay: data.isPay,
                    created_datetime: data.createdAt
                })
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        getTotalService: function (computerId) {
            var q = $q.defer();

            db('computers as c')
                .select('c.id', 'c.name', 'a.money', 'a.start_time', 'a.end_time',
                        db.raw('TIMEDIFF(CURRENT_TIME(), TIME(a.start_time)) as total_time'))
                .leftJoin('activity as a', 'a.computer_id', 'c.id')
                .where('computer_id', computerId)
                .limit(1)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0]);
                });
            return q.promise;
        },

        getServiceDetail: function (computerId) {
            var q = $q.defer();

            db('computers as c')
                .select('c.id', 'c.name', 'a.*')
                .leftJoin('activity as a', 'a.computer_id', 'c.id')
                .where('computer_id', computerId)
                .limit(1)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0]);
                });
            return q.promise;
        },

        saveActivityLog: function (data) {
            var q = $q.defer();

            db('activity_log')
                .insert(data)
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        removeActivity: function (computerId) {
            var q = $q.defer();

            db('activity')
                .where('computer_id', computerId)
                .delete()
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promse;
        },

        addTime: function (computerId, newTime) {
            var q = $q.defer();

            db.raw('UPDATE activity SET end_time=ADDTIME(end_time, ?) WHERE computer_id=?', [newTime, computerId])
                .then(function (res) {
                    q.resolve(res);
                });

            return q.promise;
        },

        changeComputer: function (oldId, newId) {
            var q = $q.defer();

            db('activity')
                .where('computer_id', oldId)
                .update({
                    computer_id: newId
                })
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        removeService: function (computerId) {
            var q = $q.defer();

            db('activity')
                .where('computer_id', computerId)
                .delete()
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        }
    };

});
