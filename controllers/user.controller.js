var db = require('../public/lib/db.js');

var User = require('../models/user.model');

module.exports.index = function(req,res){
    var data = db.get('users').value();
    res.render("userIndex.pug",{data:data});
}

module.exports.showLoginPage = function(req,res){
    console.log(req.signedCookies.sessionId);
    res.render('login.pug');
}

module.exports.showRegisterPage = function(req,res){
    res.render('register.pug');
}
module.exports.checkLogin = async function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var error = [];
    var user = await User.findOne({username:username,password:password});
    if( !user || username == ''){
        error.push('Username is wrong!');
    }
    if(error.length != 0){
        res.render('login.pug',{error:error,values:req.body});
    }
    else{
        res.cookie('userid',user._id,{signed:true});
        res.redirect("/user");
    }  
}
module.exports.register = async function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    req.body.avatar = req.file.path.split('/').splice(1).join('/');
    var error = [];
    var user = await User.find({username:username});
    if(user.length != 0 || username == ''){
        error.push('Username is exist');
    }
    if(error.length != 0){
        res.render('register.pug',{error:error,values:req.body});
    }
    else{
        User.create(req.body);
        res.redirect("http://localhost:3000/");
    }       
}





// module.exports.checkLogin = async function(req,res,next){
//     var username = req.body.username;
//     var password = req.body.password;
//     var error = [];
//     if(!db.get('users').find({username:username}).value() || username == ''){
//         error.push('Username is wrong!');
//     }
//     if(!db.get('users').find({password:password}).value() || password == ''){
//         error.push('Password is wrong!');   
//     }
//     if(error.length != 0){
//         res.render('login.pug',{error:error,values:req.body});
//     }
//     else{
//         res.cookie('userid',req.body.username,{signed:true});
//         res.redirect("/user");
//         next();
//     }  
// }
// module.exports.register = function(req,res){
//     var username = req.body.username;
//     var password = req.body.password;
//     req.body.avatar = req.file.path.split('/').splice(1).join('/');
//     var error = [];
//     if(db.get('users').find({username:username}).value() || username == ''){
//         error.push('Username is wrong!');
//     }
//     if(error.length != 0){
//         res.render('register.pug',{error:error,values:req.body});
//     }
//     else{
//         db.get('users').push(req.body).write();
//         res.redirect("http://localhost:3000/");
//     }       
// }