var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Resquested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//bo phan
var bophan = require('./controller/boPhan');
app.use('/bophan', bophan);
//get san pham User
var sanphamU = require('./controller/User/getSP');
app.use('/sanphamU', sanphamU);
var server = app.listen(88,function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Server is listenning at http://%s:%s', host, port);
});
