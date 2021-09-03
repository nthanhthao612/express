var mongoose = require('mongoose');

var tranferSchema = mongoose.Schema({
    userid: String,
    username: String,
    amount: Number,
})


var Transfer = new mongoose.model('Transfer',tranferSchema,'transfers');


module.exports = Transfer;