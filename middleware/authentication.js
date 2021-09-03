var express = require('express');
var User = require('../models/user.model');
const db = require('../public/lib/db');

var app = express();


module.exports.authenticateLogin = async function(req,res,next){
    
    if(!req.signedCookies.userid){
        res.redirect('/user/login');
        return;
    }
    var user = await User.find({_id:req.signedCookies.userid});
    if(user.length == 0){
        res.redirect('/user/login');
        return;
    }
    // console.log(req.signedCookies);
    next();
}