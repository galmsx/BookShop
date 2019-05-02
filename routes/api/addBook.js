const { promisify } = require("util");
var Op = require("../../models").Sequelize.Op;
var path = require("path");
var Genre = require("../../models").Genre;
var Author = require("../../models").Author;
var Book = require("../../models").Book;

function validName(name, extensions) {
  var ext = name.slice(-4, name.length);
  return extensions.includes(ext);
}

module.exports = (req, res) => {
  const validCoverExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
  const validBookExtensions = [".txt", ".fb2",".epub"];
  let BookFile = req.files.BookFile;
  let CoverFile = req.files.CoverFile;
  let title = req.body.Title;
  let price = req.body.Price;
  let pages = req.body.Pages;
  let descr = req.body.Descr;
  let genres_id = req.body.Genres.split(",");
  let authors_id = req.body.Authors.split(",");
  if(authors_id[0] == '' || genres_id[0] == '') {res.status(400).send('unDone'); return;};

  //try in async )0))
  BookFile.mv = promisify(BookFile.mv);

  (async () => {
    try {
      if (!validName(BookFile.name, validBookExtensions))
        throw new Error("Bad file extension");

      if (CoverFile) {
        if (!validName(CoverFile.name, validCoverExtensions))
          throw new Error("Bad file extension");
        CoverFile.mv = promisify(CoverFile.mv);
        await CoverFile.mv(
          path.join(
            __dirname,
            `../../public/covers/${title + "-" + CoverFile.name}`
          )
        );
        CoverFile = "/covers/" + title + "-" + CoverFile.name;
      } else {
        CoverFile = "/covers/none.png";
      }

      await BookFile.mv(
        path.join(
          __dirname,
          `../../content/books/${title + "-" + BookFile.name}`
        )
      );
      BookFile = title + "-" + BookFile.name;

      let newBook = Book.create({
        title,
        price,
        pages,
        descr,
        cover: CoverFile,
        content: BookFile
      });

      let genres = Genre.findAll({
        where: {
          id: {
            [Op.or]: genres_id
          }
        }
      });

      let authors = Author.findAll({
        where: {
          id: {
            [Op.or]: authors_id
          }
        }
      });

      newBook = await newBook;
      newBook.addAuthor(await authors);
      newBook.addGenre(await genres);
      res.status(200).send("done");
    } catch (err) {
      res.status(500).send(err);
    }
  })();
};
