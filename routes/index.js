var express = require('express'),
    router = express.Router(),
    userCtrl = app_require('public/javascripts/assets/controllers/UserController.js'),
    sellingItemCtrl = app_require('public/javascripts/assets/controllers/SellingItemController.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'test' });
});



router.get('/selling', function(req, res, next) {

  res.render('selling', { title: 'selling' });
});

//配置处理登陆的控制器
router.post('/loginData', function(req, res) {
  console.log("接受到login页面的登陆信息");
  //调用login控制器传入req,res
  userCtrl.login(req, res);
});

router.get('/admin', function(req, res) {
  if (!req.session.Admin_id) {
    res.redirect('/loginData');
  }
  res.redirect('/');
});

router.get('/allSellingItem',function(req,res){
  sellingItemCtrl.allSellingItem(req,res);
});

router.get('/overview',function(req,res){
  res.render('overview', { title: 'overview' });
});

router.get('/modal',function(req,res){
  res.render('modal', { title: 'modal' });
});

router.get('/amcharts',function(req,res){
  res.render('amcharts', { title: 'amcharts' });
});

router.get('/stockChart',function(req,res){
  res.render('stockChart', { title: 'stockChart' });
});

router.get('/mailTable',function(req,res){
  res.render('mailTable', { title: 'mailTable' });
});

router.get('/areaRange',function(req,res){
  res.render('areaRange', { title: 'areaRange' });
});

router.get('/over',function(req,res){
  res.render('over', { title: 'over' });
});

router.get('/insight',function(req,res){
  res.render('insight', { title: 'insight' });
});

module.exports = router;
