/**
 * log4js 日志输出配置文件
 * @type {exports}
 */
var log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: 'demo.log',
            maxLogSize: 10000000,
            backups: 3
        }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info' }
    }
});
module.exports = log4js.getLogger('file');

