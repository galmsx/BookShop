var Comment = require("./../../models").Comments;
module.exports = (req, res) => {
  var id = req.query.id;
  var userId = req.token.id;
  Comment.destroy({ where: { id, UserId: userId } })
    .then(result => {
      res.send("done");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    });
};
