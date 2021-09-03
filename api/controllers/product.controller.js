// var db = require('../../public/lib/db.js');

var Product =  require('../../models/product.model');


module.exports.mainPage = async function(req,res){
    var listProducts = await Product.find({});
    res.json(listProducts);
};


module.exports.create = async function(req,res){
    console.log(req.body);
    var newProduct = await Product.create(req.body);
    console.log(await Product.find());
    res.json(newProduct);
};