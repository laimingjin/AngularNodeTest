/**
 * Created by mj on 16/10/8.
 */
var mysql = require('mysql'),
    DBconfig = app_require('settings.js').config,
    pool = mysql.createPool(DBconfig);

var getConnection = function(success, fail) {
    pool.getConnection(function(err, connection) {
        if (err) {
            fail(err, connection);
            console.log("与MySQL数据库建立连接失败");
        } else {
            success(connection);
            console.log("与MySQL数据库建立连接成功");
        }
    });
};
exports.getConnection = getConnection;

var query = function(queryString, func) {
    var success = function(connection) {
        console.log("queryString:" + queryString);
        connection.query(queryString, function(err, rows) {
            func(err, rows);
            connectionRelease(function() {
                console.log("----------------------释放链接-------------------");
            }, connection);
        });
    };
    getConnection(success);
}
exports.query = query;

var queryWithArgs = function(queryString, args, func) {
    var success = function(connection) {
        console.log("queryString:" + queryString);
        console.log("args:" + args);
        connection.query(queryString, args, function(err, rows) {
            func(err, rows);
            connectionRelease(function() {
                console.log("----------------------释放链接-------------------");
            }, connection);
        });
    };
    getConnection(success);
}
exports.queryWithArgs = queryWithArgs;

var connectionRelease = function(doSomething, connection) {
    doSomething();
    connection.release();
}
exports.connectionRelease = connectionRelease;

var sqlFormat = function(sql, arr) {
    return mysql.format(sql,arr);
}
exports.sqlFormat = sqlFormat;