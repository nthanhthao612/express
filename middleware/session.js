var Session = require('../models/session.model');
var shortid = require('shortid');

module.exports = async function(req,res,next){
    if(!req.signedCookies.sessionId){
        var data = await Session.create({cart:[]});
        res.cookie('sessionId',data.id,{signed:true});
    }
    next();
}