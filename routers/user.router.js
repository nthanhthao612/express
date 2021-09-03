var express = require('express');
var multer = require('multer');
var router = express.Router();
const upload = multer({ dest: './public/uploads/' });


var userController = require('../controllers/user.controller.js');
var authMiddleware = require('../middleware/authentication');

router.get('/',authMiddleware.authenticateLogin,userController.index);

router.get('/login',userController.showLoginPage);

router.get('/register',userController.showRegisterPage);


router.post('/login',userController.checkLogin);

router.post('/register',upload.single('avatar'),userController.register);

module.exports = router;
