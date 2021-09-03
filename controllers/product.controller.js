var db = require('../public/lib/db.js');

var Product =  require('../models/product.model');

module.exports.mainPage = function(req,res){
    listProducts = db.get('product').value();
    // console.log(listProducts.length);
    res.render('product.pug',{listProducts:listProducts});
};

module.exports.index = async function(req,res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page - 1)* perPage;
    var end = perPage *page;
    var listProducts = await Product.find({});
    var quantity = listProducts.length;
    res.render('product.pug',{listProducts:listProducts.slice(start,end),page:page,quantity:quantity});
};




// module.exports.index = function(req,res){
//     var page = parseInt(req.query.page) || 1;
//     var perPage = 8;
//     var start = (page - 1)* perPage;
//     var end = perPage *page;
//     listProducts = db.get('product').value();
//     var quantity = listProducts.length;
//     res.render('product.pug',{listProducts:listProducts.slice(start,end),page:page,quantity:quantity});
// };