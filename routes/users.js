var express = require('express');
var router = express.Router();

var config = require('../common/config');

var jwt_middle = require("../common/jwt");

var userController = require('../controller/user');

/* GET users listing. */
router.get('/', function(req, res) {

  res.json({ message: 'hooray! welcome to user api!' });

});

//将所有dao方法封装到controller包下
//userRouter /users/register .....

router.post('/register',userController.register);

router.get('/get/:user_id',jwt_middle,userController.getUserById);

router.put('/update/:user_id',jwt_middle,userController.updateUser);

router.delete('/del/:user_id',jwt_middle,userController.delete);

router.get('/list',jwt_middle,userController.list);

router.get('/pagelist',jwt_middle,userController.pagelist);


module.exports = router;



