App.factory('LoginService', function ($q, Common) {

    var db = Common.getConnection();

    return {

        doLogin: function (username, password) {
            var q = $q.defer();

            db('users')
                .count('* as total')
                .where('username', username)
                .whereRaw('password=md5(?)', password)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0].total);
                });

            return q.promise;
        }

    };

});
