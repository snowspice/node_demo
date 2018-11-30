/**
 * jwt 中间件函数
 */
var jwt  = require('jsonwebtoken'); // 使用jwt签名
var config = require('./config');
var logger = require('./log');


// -- 校验jwt 中间件-- 需要
var jwt_middle = function (req,res,next) {

    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    logger.info(" jwt_middle is comming--->toke is -->"+token);
    if (token) {


        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, config.jwtsecret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: '无效的token.' });
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                console.log(" decoded---->"+decoded)  ;


                next(); //继续下一步路由
            }
        });
    } else {
        // 没有拿到token 返回错误
        return res.status(403).send({
            success: false,
            message: '没有找到token.'
        });
    }

}

//将中间件输出
module.exports=jwt_middle;




