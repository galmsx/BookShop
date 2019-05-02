var Genre = require("../../models").Genre;
module.exports = (req, res) => {
  var id = req.query.id;
  Genre.destroy({ where: { id } })
    .then(() => res.send("deleted"))
    .catch(err => res.status(500).send(err));
};
