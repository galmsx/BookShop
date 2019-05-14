var db = require("../../../models");

module.exports = (req, res) => {
  var UserId = req.token.id;
  db.Book.findAll({
    include: [
      {
        model: db.Purchases,
        where: { UserId }
      }
    ]
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    });
};
