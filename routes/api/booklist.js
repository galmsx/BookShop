let db = require("../../models");
var Op = db.Sequelize.Op;

module.exports = (req, res) => {
  var page = req.query.page || 1;
  var filter = req.query.filter || "";
  var genre = req.query.genre || "";
  if (genre == "all") genre = "";

  if (page < 1) {
    res.send([]);
    return;
  }

  let where = genre ? { title: genre } : {};

  (async function() {
    try {
      let books1 = db.Book.findAll({
        include: [
          {
            model: db.Genre,
            where
          }
        ],
        where: {
          title: { [Op.substring]: filter }
        },
        attributes: ["id"]
      });

      let books2 = db.Book.findAll({
        include: [
          {
            model: db.Genre,
            where
          },
          { model: db.Author, where: { name: { [Op.substring]: filter } } }
        ],
        attributes: ["id"]
      });

      books1 = await books1;
      books2 = await books2;
      let set = new Set();
      books1.forEach(el => {
        set.add(el.dataValues.id);
      });
      books2.forEach(el => {
        set.add(el.dataValues.id);
      });
      let booksId = Array.from(set.values());

      if (!booksId.length) {
        res.send([-1]);
        return;
      }

      let resBooks = await db.Book.findAll({
        include: [
          { model: db.Author, attributes: ["name"] },
          {
            model: db.Genre,
            attributes: ["title"]
          },
          { model: db.Purchases, attributes: ["mark"]}
        ],
        where: { id: { [Op.or]: booksId } },
        attributes: ["id", "title", "price", "cover", "descr"],
        limit: 5,
        offset: (page - 1) * 5
      });
      //сделать запрос чтобы вычислить среднюю оценку для каждой книги на основании того что храниться в модели коментов
      let mark = 0;
      let amount = 0;

      res.send(
        resBooks.map(e => {
          e.dataValues.Authors = e.dataValues.Authors.map(e => e.name);
          e.dataValues.Genres = e.dataValues.Genres.map(e => e.title);
          mark = 0;
          amount = 0;
          //e.dataValues.Purchases = e.dataValues.Purchases.map(e=>e.dataValues);
           e.dataValues.Purchases.forEach(e =>{
            if(e.dataValues.mark){ mark += e.dataValues.mark; amount += 1;}
          })
          e.dataValues.mark = mark /= amount;
          delete e.dataValues.Purchases;
  
          return e.dataValues;
        })
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })();
};
