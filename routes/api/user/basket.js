var Book = require('../../../models').Book;

module.exports = (req,res)=>{
    const booksId = req.query.id.split(",");
    Book.findAll({
        where : { id : booksId}
    })
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err.message);
    });
}