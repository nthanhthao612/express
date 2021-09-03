var express = require('express');
var router = express.Router();


var productController = require('../controllers/product.controller.js');

router.get("/products",productController.mainPage);
router.get("/",productController.mainPage);


router.post("/products",productController.create);

module.exports = router;