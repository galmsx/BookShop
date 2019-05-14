var Purchases = require("../../../models").Purchases;
module.exports = (req, res) => {
  var BookId = req.query.book;
  var UserId = req.token.id;
  var mark = req.query.mark;
  Purchases.findOne({
    where: { UserId, BookId }
  })
    .then(result => {
      result.mark = mark;
      return result.save();
    })
    .then(() => res.send("ok"))
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    });
};
