var Genre = require("../../models").Genre;
module.exports = (req, res) => {
  var title = req.query.title;
  Genre.create({ title })
    .then(() => res.send("ok"))
    .catch(err => {
      if (err.parent.code == "ER_DUP_ENTRY") {
        res.status(501).send("not unique login");
      } else {
        res.status(500).send(err);
      }
    });
};
