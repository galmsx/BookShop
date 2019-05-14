var User = require("../../../models").User;
module.exports = (req, res) => {
  userId = req.token.id;
  User.findOne({ where: { id: userId } })
    .then(result => {
      res.send({ money: result.money });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    });
};
