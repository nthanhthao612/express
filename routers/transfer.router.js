var express = require('express');
var router = express.Router();


var transferController = require('../controllers/transfer.controller.js');

router.get('/',transferController.index);

router.post('/',transferController.transferMoney);

module.exports = router;