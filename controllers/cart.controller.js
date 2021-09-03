const { modelName, db, collection } = require('../models/session.model');
var Session = require('../models/session.model');
var Product = require('../models/product.model');


module.exports.index = async function(req,res){
    var sessionId = req.signedCookies.sessionId;
    var curSession = await Session.findOne({id:sessionId});
    var curCart = curSession.cart;
    var listProducts = await Product.find({});
    var temp = curCart.map(function(data1){
        var temp1 = listProducts.find(function(data2){
            return data2.id == Object.keys(data1)[0];
        });
        data1.name = temp1.name;
        data1.price = temp1.price;
        data1.image = temp1.image;
        data1.quantity = data1[Object.keys(data1)[0]];
        return data1;
    });
    res.render('cart.pug',{cart:temp});
}



module.exports.addProduct = async function(req,res){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/product');
        return;
    }
    var curSession = await Session.findOne({id:sessionId});
    var curCart = curSession.cart;
    var curProduct = curCart.find(function(product){
        return product.hasOwnProperty(productId) == 1;
    });
    if(!curProduct){
        curCart.push({[productId]:1});
        await Session.updateOne({id:sessionId},{cart:curCart});
    }
    else{
        var index = curCart.indexOf(curProduct);
        var count = curProduct[productId]+1;
        curCart.splice(index,1,{[productId]:count});
        await Session.updateOne({id:sessionId},{cart:curCart});
    }   
}