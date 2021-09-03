require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/nodejs-demo');

var app = express();
var server = require('http').Server(app);
var userRouter = require('./routers/user.router.js');
var authMiddleware = require('./middleware/authentication');
var productRouter = require('./routers/product.router.js');
var transferRouter = require('./routers/transfer.router.js');
var session = require('./middleware/session');
var cartRouter = require('./routers/cart.router');
var productApi = require('./api/routers/product.router');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.set('view engine','pug');
app.set('views','./views');
// var csrfProtection = csrf({ cookie: true });
app.use(session);

app.use('/api',productApi);

app.get('/homepage',authMiddleware.authenticateLogin,function(req,res){
    res.render('homepage');
});
app.get('/',authMiddleware.authenticateLogin,function(req,res){
    res.render('homepage');
});
app.use('/user',userRouter);

app.use('/product',productRouter);

app.use('/transfer',authMiddleware.authenticateLogin,transferRouter);

app.use('/cart',cartRouter);

server.listen(3000);