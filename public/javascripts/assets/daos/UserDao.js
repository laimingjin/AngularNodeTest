/**
 * Created by minlai on 2016/10/11.
 */
var connection=app_require('public/javascripts/assets/services/Database.js');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;
var md5 = require('md5');

var selectAll = function(callback) {
    var sql = "select * from t_admin";
    try {
        //执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("UserDaoSelectAllSuccess:" + rows);
            if (err) {
                console.error("UserDaoSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("UserDaoSelectAllCatchError:" + er);
        callback(er);
    }
};
exports.selectAll = selectAll;

var insert = function(user, callback) {
    console.log("user:"+user);
    var sql = "insert into t_admin set ?";
    var obj = {
        Admin_name:user.username,
        Admin_password:md5(user.password)    //用MD5加密用户密码
    };
    console.log(obj);
    try {
        //执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("UserDaoInsertSuccess:" + rows);
            if (err) {
                console.error("UserDaoInsertError:" + err);
                callback("error",err);
                return;
            }
            callback("success");
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("UserDaoInsertCatchError:" + er);
        callback(er);
    }
};
exports.insert = insert;
