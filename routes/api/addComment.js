var Comment = require('../../models').Comments;
module.exports = (req,res)=>{
    console.log(req.body);
    var text = req.body.text;
    var bookId = req.body.BookId;
    var userId = req.body.UserId;
    
    Comment.create({text,BookId : bookId, UserId : userId})
    .then((result) => {
        res.send("ok");
    }).catch((err) => {
        res.status(500).send(err.message)
    });
}