var express= require('express');
var router=express.Router();
var Db=require('../modules/db');
var BoPhan = Db.extend({tableName:"bophanvanchuyen"});
var boPhan = new BoPhan();
var result = require('../modules/response-result')
router.use(function(req,res,next){next();});
//get all boPhan
router.get('/',function(req,res){
    boPhan.find('all',function(err,rows,fields){
        if(err)
        {
            res.send({errorCode:1,message:"Database Error!"});
        } else
        {
            res.send({errorCode:0,message:"Successfully!",data:rows});
        }
    });
});
//get boPhan with id
router.get('/:id(\\d+)',function(req,res){
    boPhan.find('first',{where: "ID_BOPHANVC="+req.params.id},function(err,rows){
        if(err)
        {
            res.send({errorCode:1,message:"Database Error!"});
        }else
        {
            res.send({errorCode:0,message:"Successfully!",data:rows});
        }
    });
});
//insert new boPhan
router.post('/', function(req, res){
    if(req.body.TENBOPHAN && req.body.SDT_BOPHAN){
        boPhan.set('TENBOPHAN',req.body.TENBOPHAN);
        boPhan.set('SDT_BOPHAN',req.body.SDT_BOPHAN);
        boPhan.set('EMAIL_BOPHAN',req.body.EMAIL_BOPHAN);
        boPhan.save(function(err, row){
            if(err){
                res.send({errorCode:1,message:"Database Error!"});
            }else {
                res.send(result.error(0,"Inserted Successfully!"));
            }
        });
    }else{
        res.send(result.error(2,"Missing field"))
    }
})
//update boPhan with id
router.put('/:id(\\d+)',function(req,res){
    if(req.body.TENBOPHAN && req.body.SDT_BOPHAN){
        boPhan.set('TENBOPHAN',req.body.TENBOPHAN);
        boPhan.set('SDT_BOPHAN',req.body.SDT_BOPHAN);
        boPhan.set('EMAIL_BOPHAN',req.body.EMAIL_BOPHAN);
        boPhan.save("ID_BOPHANVC="+req.params.id,function(err, row){
            if(err){
                res.send({errorCode:1,message:"Database Error!"});
            }else {
                res.send(result.error(0,"Inserted Successfully!"));
            }
        });
    }else{
        res.send(result.error(2,"Missing field"))
    }
})
//delete boPhan with id
router.delete('/:id(\\d+)',function(req,res){
    boPhan.find('count',{where:"ID_BOPHANVC="+req.params.id}, function(err, result){
        if(err)
            res.send(err);
        else if(result > 0){
            boPhan.remove("ID_BOPHANVC="+ req.params.id, function(err,row){
                if(err)
                res.send(result.error(0,"Inserted Successfully!"));
                else
                res.send({errorCode:0,message:"Deleted Successfully!"});
            });
        }else{
            res.send({errorCode:3,message:"Data Not Found!"});
        }
    })
})

module.exports =router;