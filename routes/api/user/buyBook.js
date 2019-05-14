var db = require("../../../models");
module.exports = (req, res) => {
  var bookId = req.query.id;
  var userId = req.token.id;
  (async () => {
    try {
      var book = db.Book.findOne({ where: { id: bookId } });
      var user = db.User.findOne({ where: { id: userId } });
      book = await book;
      user = await user;
      if(book.price <= user.money){
         await db.Purchases.create({BookId : bookId , UserId : userId, cost : book.price});
         user.money = user.money - book.price;
         await user.save();
         res.send('ok');
      }
      else throw Error("dont have enought money");


    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  })();
};
