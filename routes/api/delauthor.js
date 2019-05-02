var Author = require("../../models").Author;
module.exports = (req, res) => {
  var id = req.query.id;
  Author.destroy({ where: { id } })
    .then(() => res.send("deleted"))
    .catch(err => res.status(500).send(err));
};
