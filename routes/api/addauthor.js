var Author = require("../../models").Author;
module.exports = (req, res) => {
  var name = req.query.name;
  Author.create({ name })
    .then(() => res.send("ok"))
    .catch(err => {
      if (err.parent.code == "ER_DUP_ENTRY") {
        res.status(501).send("not unique login");
      } else {
        res.status(500).send(err);
      }
    });
};
