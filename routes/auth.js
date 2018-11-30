var express = require('express');
var jwt  = require('jsonwebtoken'); // 使用jwt签名
// var jwt = require('jwt-simple');
var config = require('../common/config');

var logger = require('../common/log');

var router = express.Router();

var User = require("../models/user");


//-- 获取用户登陆jwt ----
// 用户授权路径，返回JWT 的 Token 验证用户名密码

//--> /auth/signin

router.post('/signin', function(req, res) {

    logger.info("-info ----username-->"+req.body.username+"    userpwd-->"+req.body.password);

    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) {
            res.send(err);
        }
        console.log("user----->"+user);
        if (!user) {
            res.json({ res_code: '10002', message: '未找到授权用户' });
        } else if (user) {

            if (user.userpwd != req.body.password) {
                res.json({ res_code: '10003', message: '用户密码错误' });
            } else {
                var token = jwt.sign(user.toJSON(), config.jwtsecret, {
                    expiresIn : 60*60*24// 授权时效24小时
                });
                res.json({
                    res_code: 200,
                    message: '请使用您的授权码',
                    data: token
                });
            }
        }
    });
});



// 登出接口
router.post('/signout',function (req,res) {

    console.log("sign out");

    res.json({res_code:'200',message:'sign out success'});
})


module.exports = router;