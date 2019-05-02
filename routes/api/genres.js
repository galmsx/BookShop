var Genre = require("../../models").Genre;
var Op = require("../../models").Sequelize.Op;
module.exports = (req, res) => {
  var filter = req.query.filter || "";
  Genre.findAll({
    attributes: ["id", "title"],
    where: {
      title: {
        [Op.like]: `%${filter}%`
      }
    }
  })
    .then(authors => res.send(authors))
    .catch(err => res.status(500).send(err));
};
