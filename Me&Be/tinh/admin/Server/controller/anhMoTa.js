var express = require('express');
var router = express.Router();
var url = require('url');
var Db=require('../modules/db');
var result = require('../modules/response-result');

var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'tmp/'});

var HinhAnh = Db.extend({tableName:'hinhanh'});
var hinhAnh = new HinhAnh();
const filePath = './img/moTa/';
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use('/img/moTa',express.static(__dirname + '/img/moTa'));
router.use(function (req, res, next){ next(); });

router.get('/', function(req, res){
    hinhAnh.query('select * from hinhanh,sanpham where hinhanh.ID_SP = sanpham.ID_SP',function(error, rows, fields){
        if (error) {
            res.send({errorCode:1,message:"Database Error!"});
        } else {
            for(let i=0;i<rows.length;i++){
                if (rows[i].DUONGDAN!=null) {
                    var reqUrl = url.format({
                        protocol: req.protocol,
                        host: req.get('host'),
                    });
                    rows[i].DUONGDAN = reqUrl + '/img/moTa/' + rows[i].DUONGDAN;
                }
            }
            res.send({errorCode:0,message:"Successfully!",data:rows});
        }
    });
});
router.get('/sp', function(req, res){
    hinhAnh.query('select ID_SP,TENSP from sanpham',function(error, rows, fields){
        if (error) {
            res.send({errorCode:1,message:"Database Error!"});
        } else {
            for(let i=0;i<rows.length;i++){
                if (rows[i].DUONGDAN!=null) {
                    var reqUrl = url.format({
                        protocol: req.protocol,
                        host: req.get('host'),
                    });
                    rows[i].DUONGDAN = reqUrl + '/img/moTa/' + rows[i].DUONGDAN;
                }
            }
            res.send({errorCode:0,message:"Successfully!",data:rows});
        }
    });
});

router.get('/:id(\\d+)', function(req, res){
    hinhAnh.find('first', {where:'ID_HINHANH=' + req.params.id}, function(err, row){
        if (err) {
            res.send({errorCode:1,message:"Database Error!"});
        } else {
            if (row.DUONGDAN) {
                var reqUrl = url.format({
                    protocol: req.protocol,
                    host: req.get('host'),
                });
                row.DUONGDAN = reqUrl + '/img/moTa/' + row.DUONGDAN;
            }
            res.send({errorCode:0,message:"Successfully!",data:row});
        }
    });
});

router.post('/', upload.single('DUONGDAN'), function (req, res) {
    var duoi=req.file.mimetype.substring(6);
    var domainUrl = req.connection.encrypted ? 'https://' : 'http://' + req.headers.host; 
    if (req.body.ID_SP ) {
             hinhAnh.set('ID_SP', req.body.ID_SP);
        hinhAnh.save(function(err, row){
            if (err) {
                res.send({errorCode:1,message:"Database Error!"});
            } else {
                if (req.file) {
                    let lastestId = row.insertId;
                    let fileName = req.body.ID_SP+'_'+ lastestId + '.' +duoi;
                    let newFile = filePath + fileName;
                    fs.readFile(req.file.path, function(err, data) {
                        fs.writeFile(newFile, data, function(err){
                            if (err) {
                                res.send(Result.error(2, 'Write file error!'));
                            } else {
                                fs.unlinkSync(req.file.path);
                                hinhAnh.set('DUONGDAN', fileName);
                                hinhAnh.save('ID_HINHANH=' + lastestId, function(err, row) {
                                    if (err) {
                                        res.send({errorCode:1,message:"Database Error!"});
                                    } else {
                                        hinhAnh.set('ID_HINHANH', lastestId);
                                        var reqUrl = url.format({
                                            protocol: req.protocol,
                                            host: req.get('host')
                                            // pathname: req.originalUrl,
                                        });
                                        hinhAnh.set('Image', reqUrl + '/img/moTa/' + fileName);
                                        res.send(result.error(0,"Inserted Successfully!"));
                                    }
                                })     
                            }
                        })
                    });
                 
                } else {
                    res.send(result.error(0,"Inserted Successfully!"));
                }         
            }
        });
    }
});

router.put('/:id(\\d+)', upload.single('DUONGDAN'), function (req, res) {
    var duoi=req.file.mimetype.substring(6);
    var domainUrl = req.connection.encrypted ? 'https://' : 'http://' + req.headers.host; 
    if (req.body.ID_SP ) {
        let lastestId = req.params.id;
        hinhAnh.find('first', {where:'ID_HINHANH=' + lastestId}, function(err, rowFind) {
            if (err) {
                res.send({errorCode:3,message:"Data Not Found!"});
            } else {
                hinhAnh.set('ID_SP', req.body.ID_SP);
                hinhAnh.save('ID_HINHANH=' + lastestId, function(err, row){
                    if (err) {
                        res.send({errorCode:1,message:"Database Error!"});
                    } else {
                        if (req.file) { 
                            if (rowFind.DUONGDAN) {
                                fs.exists(filePath + rowFind.DUONGDAN, function(exists) {
                                    if (exists) {
                                        fs.unlinkSync(filePath + rowFind.DUONGDAN);
                                    }
                                });
                            }
                            let fileName = req.body.ID_SP+'_'+ lastestId + '.' +duoi;
                            let newFile = filePath + fileName;
                            fs.readFile(req.file.path, function(err, data) {
                                fs.writeFile(newFile, data, function(err){
                                    if (err) {
                                        res.send(Result.error(2, 'Write file error!'));
                                    } else {
                                        //remove tmp file
                                        fs.unlinkSync(req.file.path);
                                        hinhAnh.set('DUONGDAN', fileName);
                                        hinhAnh.save('ID_HINHANH=' + lastestId, function(err, row) {
                                            if (err) {
                                                res.send({errorCode:1,message:"Database Error!"});
                                            } else {
                                                hinhAnh.set('ID_HINHANH', lastestId);
                                                var reqUrl = url.format({
                                                    protocol: req.protocol,
                                                    host: req.get('host'),
                                                    // pathname: req.originalUrl,
                                                });
                                                hinhAnh.set('DUONGDAN', reqUrl + '/img/moTa/' + fileName);
                                                res.send(result.error(0,"Inserted Successfully!"));
                                            }
                                        })
                                    }
                                })
                            });
                        } else {
                            res.send(result.error(0,"Inserted Successfully!"));
                        }         
                    }
                });
            }
            
        })
    }
});

router.delete('/:id(\\d+)', function(req, res) {
    hinhAnh.find('first', {where:'ID_HINHANH=' + req.params.id}, function(err, row) {
        if (err) {
            res.send({errorCode:3,message:"Data Not Found!"});
        } else {
            if (row.DUONGDAN) {
                fs.exists(filePath + row.DUONGDAN, function(exists) {
                    if (exists) {
                        fs.unlinkSync(filePath + row.DUONGDAN);
                    }
                });
            }
            //remove from DB
            hinhAnh.remove('ID_HINHANH=' + req.params.id, function(err, row) {
                if (err) {
                    res.send({errorCode:1,message:"Database Error!"});
                } else {
                    res.send({errorCode:0,message:"Deleted Successfully!"});
                }
            });
        }
    });
})

module.exports = router;