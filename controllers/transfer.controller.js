const { render } = require('pug');
var db = require('../public/lib/db');

var Transfer = require('../models/transfer.model');
var User = require('../models/user.model');

module.exports.index = function(req,res){
    res.render('transfer.pug',{csrfToken:req.csrfToken()});
}



module.exports.transferMoney = async function(req,res){
    var error = [];
    req.body.userid = req.signedCookies.userid;
    req.body.amount = parseInt(req.body.amount);
    var user = await User.findOne({username:req.body.username});
    var data = req.body;
    if(!user || req.body.username == ''){
        error.push("Username dosen't exist");
    }
    if(error.length != 0){
        res.render('transfer.pug',{error:error,data:data});
        return;
    }   
    else{
        Transfer.create(req.body);
        res.redirect('/transfer');
    }
}

// module.exports.transferMoney = function(req,res){
//     req.body.userid = req.signedCookies;
//     console.log(req.body);
//     req.body.amout = parseInt(req.body.amout);
//     db.get('transfer').push(req.body).write();
//     res.redirect('/transfer');
// }