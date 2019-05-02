var Author = require("../../models").Author;
var Op = require("../../models").Sequelize.Op;
module.exports = (req, res) => {
  var filter = req.query.filter;
  Author.findAll({
    attributes: ["id", "name"],
    where: {
      name: {
        [Op.like]: `%${filter}%`
      }
    }
  })
    .then(authors => res.send(authors))
    .catch(err => res.status(500).send(err));
};
