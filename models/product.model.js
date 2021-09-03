var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    name: String,
    describe: String,
    image: String,
    price: String
});

var Product = mongoose.model('Product',productSchema,'products');

module.exports = Product;