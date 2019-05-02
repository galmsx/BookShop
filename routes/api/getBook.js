var db = require("../../models");

module.exports = (req, res) => {
  var id = req.query.id;
  var userId = req.token ? req.token.id : null;
  db.Book.findAll({
    include: [
      { model: db.Author, attributes: ["name"] },
      { model: db.Genre, attributes: ["title"] },
      { model: db.Comments }
    ],
    where: { id }
  })
    .then(book => {
      book = book[0].dataValues;
      book.Authors = book.Authors.map(el => el.dataValues.name);
      book.Genres = book.Genres.map(el => el.dataValues.title);
      book.Comments = book.Comments.map(el => el.dataValues);

      db.Purchases.findAll({
        where: {
          BookId: id,
          UserId: userId
        }
      })
        .then(dat => {
          var purchased = dat.length ? true : false;
          book.purchased = purchased;

          db.User.findAll({
            where: {
              id: {
                [db.Sequelize.Op.or]: book.Comments.map(e => e.UserId).concat([
                  -1
                ])
              }
            },
            attributes: ["login", "id"]
          })
            .then(users => {
              users = users.map(e => e.dataValues);
              book.Comments = book.Comments.map(e => {
                var login = users.filter(el => el.id == e.UserId)[0].login;

                e.UserLogin = login;
                return e;
              });

              res.send(book);
            })
            .catch(err => {
              console.log(err);
              res.status(500).send(err);
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
