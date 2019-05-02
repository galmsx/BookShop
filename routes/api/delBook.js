var Book = require("../../models").Book;
var fs = require("fs");
var path = require("path");


module.exports = (req, res) => {
  var id = req.query.id;
  var book, cover, content;

  Book.findAll({ where: { id } })
    .then(dat => {
      cover = dat[0].dataValues.cover;
      if(cover == "/covers/none.png") cover = "";
      content = dat[0].dataValues.content;
      book = dat[0];
      fs.unlink(path.join(__dirname, "../../content/books/" + content),()=>{});
      fs.unlink(path.join(__dirname, "../../public/" + cover),()=>{});
      return book.destroy();
    })
    .then(() => res.send("Done"))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
