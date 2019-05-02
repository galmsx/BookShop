var db = require('../../models');
var fs = require('fs');
var path = require('path');
var promisify = require('util').promisify;

module.exports = (req,res)=>{
    var id = req.query.id;
    var UserId = req.token.id;
     fs.readFile = promisify(fs.readFile);

    db.Book.findOne({
        include :[
            {
                model : db.Purchases,
                where : {UserId}
            }
        ],
        where : {id}
    })
    .then(dat=>{
        return fs.readFile(path.join(__dirname,'../../content/books/'+dat.dataValues.content));
    })
    .then(file=>{
        res.setHeader('Content-disposition','attachment; filename=file.fb2');
        console.log(file);
        res.send(file);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err.message);
    })
};