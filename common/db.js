var mongoose = require('mongoose');

var config = require('./config'); // 引入配置

var logger = require('./log');

//    DB_URL = 'mongodb://localhost:27017/test';

/**
 * 连接
 */
mongoose.connect(config.dburl);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + config.dburl);
    logger.info("Mongoose connection open to -->"+ config.dburl);


});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
    logger.error("---->Mongoose connection error: "+err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
    logger.info('Mongoose connection disconnected');
});


mongoose.Promise = global.Promise;  //为了避免警告的出现，因为mongoose的默认promise已经弃用了
module.exports = mongoose;