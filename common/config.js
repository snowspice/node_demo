/**
 * 全局配置信息:调用方式 config.jwtsecret  ;
 * @type {{network: {port: number}, jwtsecret: string, dburl: string}}
 */
module.exports = {
    'network' : {
        'port':3000
    },
    'jwtsecret': 'myjwttest',
    'dburl': 'mongodb://192.168.0.140:27017/test' //连接docker 外部服务 ,其中宿主机局域网地址是192.168.0.140
   // 'dburl': 'mongodb://127.0.0.1:27017/test' //ide启动
    //'dburl': 'mongodb://mongodb/test' // swarm启动,链接swarm 内部mongodb服务
};
