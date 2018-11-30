/**
 * 将所有操作数据库操作,统一写在此模块下
 */
var logger = require('../common/log');
var User = require("../models/user");

var controllers = {

    'register' : function(req,res){

        var user = new User();

        console.log("req.body===>"+ JSON.stringify(req.body));

        user.username = req.body.username;
        user.userpwd = req.body.userpwd;
        user.userage = +req.body.userage; //转换成数字类型
        user.registerdate = new Date(); //标准时间
      

        console.log("logindate--->"+user.logindate);

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({res_code: '200', message: 'register ok' });
        });
        
    },

    'getUserById' :function (req,res) {

        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json({res_code:'200',message:'get ok',data:user});
        });

    },

    'updateUser' :function (req,res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.username = req.body.username;
            user.userpwd = req.body.userpwd;
            user.userage = +req.body.userage; //转换成数字类型
            // user.registerdate = new Date(); //标准时间

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({res_code:'200', message: ' updated ok' });
            });

        });
    },
    
    'delete': function (req,res) {

        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({res_code:'200', message: 'Successfully deleted' });
        });

    },

    'list' :function (req,res) {

        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json({res_code:'200',message:'ok',data:users});
        });

    },

    'pagelist':function (req,res) {


        var page=+req.query.page; // post 请求,获取参数使用req.body.page
        var rows=+req.query.rows; //注意字符串转数值类型

        if(page == undefined){
            page =1;
        }
        if(rows == undefined){
            rows =10;
        }

        //按照姓名查询
        var username=req.query.username;
        console.log(username);
        console.log("page:"+page+",rows:"+rows);

        logger.info('-step1-->page list para--> username:'+username+'  page:'+page+'  rows:'+rows);

        var query=User.find({});
        query.skip((page-1)*rows);
        query.limit(rows);
        if(username){
            query.where('username',username);
        }
        //计算分页数据
        query.exec(function(err,rs){
            if(err){
                res.send(err);
            }else{
                //计算数据总数
                User.find(function(err,result){
                    jsonArray={rows:rs,total:result.length};
                    res.json({res_code:"200",message:"ok",data:jsonArray});
                });

            }
        });

    }

}
exports=module.exports = controllers
