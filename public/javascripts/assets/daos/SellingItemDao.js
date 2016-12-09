/**
 * Created by minlai on 2016/10/11.
 */
var connection=app_require('public/javascripts/assets/services/Database.js');
var query = connection.query;

var selectAll=function(callback){
    var sql="select * from selling";
    try{
        query(sql,function(err,rows){
            if(err){
                console.error("SellingSelectAllError:"+err);
            }else{
                console.log("SellingSelectAllSuccess:"+rows);
            }
            callback(rows);
        });
    }catch(err){
        console.error("SellingSelectAllCatchError:"+err);
        callback(err);
    }
};
exports.selectAll=selectAll;

