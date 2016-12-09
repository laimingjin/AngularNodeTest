/**
 * Created by minlai on 2016/10/11.
 */
var sellingItemDao = app_require('public/javascripts/assets/daos/SellingItemDao.js');

exports.allSellingItem=function(req,res){
    sellingItemDao.selectAll(function(rows){
       res.status(200).json(rows);
    });
};
