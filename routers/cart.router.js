var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cart.controller');


router.get('/add/:productId',cartController.addProduct);
router.get('/',cartController.index);

module.exports = router;
