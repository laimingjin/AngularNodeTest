/**
 * Created by minlai on 2016/10/11.
 */
var UserDao = app_require('public/javascripts/assets/daos/UserDao.js'),
    md5 = require('md5');

//登陆的控制器
exports.login = function(req, res) {

    //获取请求数据并查看数据库
    var Admin_name = req.body.inputUsername,
        Admin_password = md5(req.body.inputPassword); //这里对密码进行MD5加密来确认密码
        //Admin_password = req.body.inputPassword;
    UserDao.selectAll(function(rows) {
        //缓存变量，提高查找效率
        var i, len;
        //获得后台的用户列表数据
        // var userList = JSON.parse(JSON.stringify(rows));
        for (i = 0, len = rows.length; i < len; i++) {

            console.log("需要数据库匹配的账号为：" + Admin_name);
            console.log("需要数据库匹配的密码为：" + Admin_password);

           if (rows[i].Admin_name === Admin_name && md5(rows[i].Admin_password) === Admin_password) {
                console.log(rows[i]);
                break;
            }
        }

        if (i < len) {
            console.log("找到了用户");
            //检验通过，设置session
            req.session.regenerate(function() {
                //设置用户id
                req.session.Admin_id = rows[i].Admin_id;
                //设置用户名
                req.session.Admin_name = Admin_name;
                //设置信息
                console.log("输出session到客户端:" + req.session.Admin_id);

                res.redirect('/admin');
            });
        } else {
            console.log("登陆错误");
            res.render('error',{
                msg: '登陆错误！用户名或密码不正确',
                link: '/'
            });
        }
    });
}
